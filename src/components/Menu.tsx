"use client";

import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { useEffect, useState } from "react";
import { GET_LIST_VIDEO_GAMES_GENRES, PUT_LOG } from '../constants/endpoints.constants';

type MenuProps = {
    onMenuGenreClick: (genre: Genre) => void;
};

type Genre = {
    id: number,
    name: string
};

export function Menu({ onMenuGenreClick }: MenuProps) {
    const [genres, setGenres] = useState<Genre[]>([]);

    const registerLog = async (method: string, ret: string) => {
        try {
          const response = await fetch(PUT_LOG(method, ret));
    
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
    
          const data = await response.json();
    
          console.log(`Return registerLog: ${data.results}`)
    
        } catch (error) {
          console.error('Error registering log:', error);
        }
    }

    const fetchGenres = async () => {
        try {
            const response = await fetch(GET_LIST_VIDEO_GAMES_GENRES);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            setGenres(data.results);

            registerLog('GET_LIST_VIDEO_GAMES_GENRES', data.results.length);
        } catch {
            console.log('Error when searching genres');
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Games Search</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => onMenuGenreClick({id: 0, name: 'All'})}>Home</Nav.Link>
                        <NavDropdown title="Genres" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => onMenuGenreClick({id: 0, name: 'All'})}>All</NavDropdown.Item>
                            {genres.map(genre => (
                                <NavDropdown.Item key={genre.id} onClick={() => onMenuGenreClick(genre)}>{genre.name}</NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}