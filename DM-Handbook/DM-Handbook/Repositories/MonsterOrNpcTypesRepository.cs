using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Models;
using DM_Handbook.Utils;
using Microsoft.Extensions.Configuration;

namespace DM_Handbook.Repositories
{
    public class MonsterOrNpcTypesRepository : BaseRepository, IMonsterOrNpcTypesRepository
    {

        public MonsterOrNpcTypesRepository(IConfiguration configuration) : base(configuration) { }


        public List<MonsterOrNpcType> GetAll()
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, Name
                  FROM MonsterOrNpcType 
                    ORDER BY Name
                       ";

                    var reader = cmd.ExecuteReader();

                    var monsterNpcTypes = new List<MonsterOrNpcType>();
                    while (reader.Read())
                    {
                        monsterNpcTypes.Add(new MonsterOrNpcType()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                        });
                    }

                    reader.Close();

                    return monsterNpcTypes;
                }
            }
        }

    }
}
