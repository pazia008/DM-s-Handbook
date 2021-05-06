using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface IMonsterOrNpcTypesRepository
    {
        List<MonsterOrNpcType> GetAll();
    }
}