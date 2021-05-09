using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface IMonsterNpcsRepository
    {
        List<MonsterNpcs> GetAllByUserId(int userId);
        MonsterNpcs GetById(int monsterNpcId);
        void Add(MonsterNpcs monster);
        void Delete(int monsterNpcId);
        void Update(MonsterNpcs monster);
        List<MonsterNpcs> GetMonsterByAdventureId(int adventureNoteId);
        
    }
}