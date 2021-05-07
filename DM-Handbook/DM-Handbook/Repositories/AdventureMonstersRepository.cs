using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Models;
using Microsoft.Extensions.Configuration;

namespace DM_Handbook.Repositories
{
    public class AdventureMonstersRepository : BaseRepository
    {

        public AdventureMonstersRepository(IConfiguration configuration) : base(configuration) { }

        public void AddAdventureMonster(AdventureMonsters adventureMonsters)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO AdventureMonsters(AdventureId, MonsterNpcId)
                        OUTPUT INSERTED.ID
                        VALUES (@AdventureNoteId, @MonsterNpcId)";

                    cmd.Parameters.AddWithValue("@AdventureNoteId", adventureMonsters.AdventureId);
                    cmd.Parameters.AddWithValue("@MonsterNpcId", adventureMonsters.MonsterNpcId);

                    int id = (int)cmd.ExecuteScalar();

                    adventureMonsters.Id = id;
                }
            }
        }

    }
}
