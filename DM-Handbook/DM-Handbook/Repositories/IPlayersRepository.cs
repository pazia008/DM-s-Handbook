using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface IPlayersRepository
    {
        List<Players> GetAllByUserId(int userId);
    }
}