using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Models;
using DM_Handbook.Utils;
using Microsoft.Extensions.Configuration;

namespace DM_Handbook.Repositories
{
    public class MonsterNpcsRepository : BaseRepository, IMonsterNpcsRepository
    {

        public MonsterNpcsRepository(IConfiguration configuration) : base(configuration) { }


        public List<MonsterNpcs> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            SELECT mn.Id, mn.UserId, mn.MonsterOrNpcTypeId, mn.Synopsis, mn.[Name], mn.Abilities, mn.DateCreated, mt.Id AS MonsterId, mt.[Name] AS MonsterOrNpc
                            FROM MonsterNpcs mn
                            LEFT JOIN MonsterOrNpcType mt on mn.MonsterOrNpcTypeId = mt.Id
                            WHERE mn.UserId = @UserId
                            ORDER BY mn.DateCreated ASC";


                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var monsters = new List<MonsterNpcs>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var monster = new MonsterNpcs()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Synopsis = reader.GetString(reader.GetOrdinal("Synopsis")),
                            Abilities = reader.GetString(reader.GetOrdinal("Abilities")),
                            DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                            MonsterOrNpcTypeId = reader.GetInt32(reader.GetOrdinal("MonsterOrNpcTypeId")),
                            MonsterOrNpcTypes = new MonsterOrNpcType()
                            {
                                Id = DbUtils.GetInt(reader, "MonsterId"),
                                Name = DbUtils.GetString(reader, "MonsterOrNpc"),
                            },

                        };
                        monsters.Add(monster);
                    }
                    reader.Close();

                    return monsters;
                }
            }
        }


    }
}
