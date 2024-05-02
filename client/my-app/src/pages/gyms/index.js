import React, { useState } from 'react';
import { Container } from '@mui/material';
import GymGrid from '@/components/GymGrid'; // Ensure this path is correct
import axios from 'axios';
import Navbar from "@/components/Navbar";

function GymsPage() {
    const [gyms, setGyms] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    React.useEffect(() => {
        const fetchGyms = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/gyms?page=${page}`);
                setGyms(response.data.gyms);
                setTotal(response.data.total);
            } catch (error) {
                console.error('Failed to fetch gyms', error);
            }
        };
        fetchGyms();
    }, [page]);

    return (
        <Container>
            <Navbar></Navbar>
            <GymGrid gyms={gyms} page={page} setPage={setPage} total={total} />
        </Container>
    );
}

export default GymsPage;
