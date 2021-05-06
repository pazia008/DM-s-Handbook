using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DM_Handbook.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DM_Handbook.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MonsterOrNpcTypesController : ControllerBase
    {

        private readonly IMonsterOrNpcTypesRepository _monsterNpcTypeRepository;
        public MonsterOrNpcTypesController(IMonsterOrNpcTypesRepository monsterNpcTypeRepository)
        {
            _monsterNpcTypeRepository = monsterNpcTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_monsterNpcTypeRepository.GetAll());
        }

    }
}
