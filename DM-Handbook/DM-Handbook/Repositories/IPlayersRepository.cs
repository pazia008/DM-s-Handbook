using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface IPlayersRepository
    {
        List<Players> GetAllByUserId(int userId);
        Players GetById(int playerId);
        void Add(Players player);
        void Delete(int playerId);
        void Update(Players players);
    }
}