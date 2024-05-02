const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001'
}));

const PORT = process.env.PORT || 8080;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to PostgreSQL at:', result.rows[0].now);
  });
});

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/test-db', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    res.send(`Database time: ${rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to connect to the database');
  }
});

app.get('/pokemon', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 21;
  const offset = (page - 1) * limit;

  try {
    const queryText = `
            SELECT p.pokemon_id, p.pokemon_name, t1.type_id AS type1_id, t2.type_id AS type2_id, 
                t1.type_name AS type1_name, t2.type_name AS type2_name
            FROM pokemon p
            LEFT JOIN types t1 ON p.type1_id = t1.type_id
            LEFT JOIN types t2 ON p.type2_id = t2.type_id
            ORDER BY p.pokemon_id
            LIMIT $1 OFFSET $2
        `;
    const { rows } = await pool.query(queryText, [limit, offset]);
    const countResult = await pool.query('SELECT COUNT(*) FROM pokemon');
    const total = parseInt(countResult.rows[0].count);
    res.json({ pokemon: rows, total: total });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve data');
  }
});

app.get('/pokemon/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pokemonQueryText = `
      SELECT p.pokemon_id, p.pokemon_name, p.type1_id, t1.type_name AS type1_name, p.type2_id, t2.type_name AS type2_name
      FROM pokemon p
      LEFT JOIN types t1 ON p.type1_id = t1.type_id
      LEFT JOIN types t2 ON p.type2_id = t2.type_id
      WHERE p.pokemon_id = $1
    `;
    const pokemonResult = await pool.query(pokemonQueryText, [id]);

    if (pokemonResult.rows.length === 0) {
      return res.status(404).send('Pokemon not found');
    }

    const pokemon = pokemonResult.rows[0];

    const movesQueryText = `
      SELECT m.move_id, m.move_name, m.power, m.accuracy, m.type_id, 
             t.type_name AS move_type, m.move_description
      FROM pokemon_moves pm
      JOIN moves m ON pm.move_id = m.move_id
      LEFT JOIN types t ON m.type_id = t.type_id
      WHERE pm.pokemon_id = $1
    `;
    const movesResult = await pool.query(movesQueryText, [id]);
    const moves = movesResult.rows;

    res.json({
      pokemon: {
        ...pokemon,
        moves: moves.map(move => ({
          move_id: move.move_id,
          move_name: move.move_name,
          power: move.power,
          accuracy: move.accuracy,
          type_id: move.type_id,
          move_type: move.move_type,
          move_description: move.move_description
        }))
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve data');
  }
});


app.get('/gyms', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Adjust the limit as needed
  const offset = (page - 1) * limit;

  try {
    const gymsQuery = `
      SELECT DISTINCT ON (gy.gym_id) gy.gym_id, gy.gym_name, gy.gym_location, gt.trainer_id, 
                    tr.first_name as trainer_name, gt.type_id, ty.type_name,
                    bd.badge_name, bd.badge_description
          FROM gyms gy
          LEFT JOIN gym_trainers gt ON gy.gym_id = gt.gym_id
          LEFT JOIN trainers tr ON gt.trainer_id = tr.trainer_id
          LEFT JOIN types ty ON gt.type_id = ty.type_id
          LEFT JOIN badges bd ON gt.type_id = bd.type_id
          ORDER BY gy.gym_id, gy.gym_name
          LIMIT $1 OFFSET $2

    `;
    const gymsResult = await pool.query(gymsQuery, [limit, offset]);
    const countResult = await pool.query('SELECT COUNT(*) FROM gyms');
    const total = parseInt(countResult.rows[0].count);
    res.json({ gyms: gymsResult.rows, total: total });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve gyms');
  }
});


app.get('/trainers/:trainer_id', async (req, res) => {
  const { trainer_id } = req.params;

  try {
    const trainerQuery = `
      SELECT t.trainer_id, t.first_name, t.email, t.phone_number
      FROM trainers t
      WHERE t.trainer_id = $1;
    `;

    const pokemonQuery = `
      SELECT tp.trainer_pokemon_id, tp.pokemon_id, p.pokemon_name, t1.type_id AS type1_id, t2.type_id AS type2_id,
             t1.type_name AS type1_name, t2.type_name AS type2_name, tp.level
      FROM trainer_pokemon tp
      JOIN pokemon p ON tp.pokemon_id = p.pokemon_id
      LEFT JOIN types t1 ON p.type1_id = t1.type_id
      LEFT JOIN types t2 ON p.type2_id = t2.type_id
      WHERE tp.trainer_id = $1;
    `;

    const movesQuery = `
      SELECT plm.trainer_pokemon_id, m.move_name, m.move_id, m.power, m.accuracy, m.type_id, plm.slot
      FROM pokemon_learned_moves plm
      JOIN pokemon_moves pm ON plm.pokemon_move_id = pm.pokemon_move_id
      JOIN moves m ON pm.move_id = m.move_id
      WHERE plm.trainer_pokemon_id IN (
        SELECT tp.trainer_pokemon_id
        FROM trainer_pokemon tp
        WHERE tp.trainer_id = $1
      )
      ORDER BY plm.trainer_pokemon_id, plm.slot;
    `;

    const itemsQuery = `
      SELECT i.item_id, i.item_name, i.item_type
      FROM trainer_items ti
      JOIN items i ON ti.item_id = i.item_id
      WHERE ti.trainer_id = $1;
    `;

    const eventsQuery = `
      SELECT e.event_id, e.event_name, e.start_date, e.event_description
      FROM trainer_events te
      JOIN events e ON te.event_id = e.event_id
      WHERE te.trainer_id = $1;
    `;

    const badgesQuery = `
      SELECT b.badge_id, b.badge_name, b.badge_description
      FROM trainer_badges tb
      JOIN badges b ON tb.badge_id = b.badge_id
      WHERE tb.trainer_id = $1;
    `;

    const [trainerResult, pokemonResult, movesResult, itemsResult, eventsResult, badgesResult] = await Promise.all([
      pool.query(trainerQuery, [trainer_id]),
      pool.query(pokemonQuery, [trainer_id]),
      pool.query(movesQuery, [trainer_id]),
      pool.query(itemsQuery, [trainer_id]),
      pool.query(eventsQuery, [trainer_id]),
      pool.query(badgesQuery, [trainer_id])
    ]);

    if (trainerResult.rows.length === 0) {
      return res.status(404).send('Trainer not found');
    }

    const pokemonMoves = {};
    movesResult.rows.forEach(move => {
      if (!pokemonMoves[move.trainer_pokemon_id]) {
        pokemonMoves[move.trainer_pokemon_id] = [];
      }
      pokemonMoves[move.trainer_pokemon_id].push(move);
    });

    const pokemonData = pokemonResult.rows.map(pokemon => ({
      ...pokemon,
      moves: pokemonMoves[pokemon.trainer_pokemon_id] || []
    }));

    res.json({
      trainer: trainerResult.rows[0],
      pokemons: pokemonData,
      items: itemsResult.rows,
      events: eventsResult.rows,
      badges: badgesResult.rows
    });
  } catch (err) {
    res.status(500).send('Failed to retrieve trainer details');
  }
});


app.get('/top-battlers', async (req, res) => {
  try {
    const queryText = `
      SELECT t.trainer_id, t.username, COUNT(b.winner_id) AS win_count
      FROM trainers t
      JOIN battles b ON t.trainer_id = b.winner_id
      GROUP BY t.trainer_id, t.username
      ORDER BY win_count DESC
      LIMIT 100;
    `;
    const { rows } = await pool.query(queryText);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve top battlers');
  }
});
