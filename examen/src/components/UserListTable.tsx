import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { GameTitle } from "../types/Game.types"
import { Image, Table } from "react-bootstrap"
import useAuth from '../hooks/useAuth'
import useGetGames from '../hooks/useGetGames'

const UserListTable = () => {
    const { currentUser } = useAuth()
    const {
        data: games,
    } = useGetGames(currentUser?.uid)
  return (
    <Table> 
        <thead>
            <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
        {games && games.map((game, index) => (
             <tbody key={game.name}>
             <tr>
                <td>{index + 1}</td>
                <td>
                {game.background_image && 
                <Image 
                    src={game.background_image} 
                    alt={game.name} 
                    fluid 
                    style={{ width: '150px', height: 'auto' }}
                    />}
                </td>
                <td>{game.name}</td>
                <td>{game.score || 0}</td>
             </tr>
         </tbody>
        ))}
    </Table>
  )
}

export default UserListTable