using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DM_Handbook.Models;
using DM_Handbook.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static DM_Handbook.Models.UserProfiles;

namespace DM_Handbook.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MonsterNpcsController : ControllerBase
    {


        private readonly IMonsterNpcsRepository _monsterNpcsRepository;
        private readonly IUserProfilesRepository _userProfilesRepository;

        public MonsterNpcsController(IMonsterNpcsRepository monsterNpcsRepository, IUserProfilesRepository userProfilesRepository)
        {
            _monsterNpcsRepository = monsterNpcsRepository;
            _userProfilesRepository = userProfilesRepository;
        }


        [HttpGet]
        public IActionResult GetAllByUserId()
        {
            var currentUserProfile = GetCurrentUser();

            if (currentUserProfile == null) return NotFound();

            List<MonsterNpcs> userCampaigns = _monsterNpcsRepository.GetAllByUserId(currentUserProfile.Id);

            return Ok(userCampaigns);
        }

        [HttpGet("{monsterId}")]
        public IActionResult Get(int monsterId)
        {
            var currentUserProfile = GetCurrentUser();

            if (currentUserProfile == null) return NotFound();

            var tag = _monsterNpcsRepository.GetById(monsterId);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }


        [HttpPost]
        public IActionResult Add(MonsterNpcs monster)
        {
            var currentUserProfile = GetCurrentUser();

            monster.UserId = currentUserProfile.Id;
            _monsterNpcsRepository.Add(monster);

            return Ok(monster);
        }




        [HttpDelete("{monsterNpcId}")]
        public IActionResult Delete(int monsterNpcId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _monsterNpcsRepository.Delete(monsterNpcId);
            return NoContent();
        }



        [HttpPut("{monsterId}")]
        public IActionResult Put(MonsterNpcs monster)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _monsterNpcsRepository.Update(monster);
            return NoContent();
        }


        [HttpGet("GetMonsterByAdventureId/{adventureNoteId}")]
        public IActionResult GetMonsterByAdventureId(int adventureNoteId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            var tag = _monsterNpcsRepository.GetMonsterByAdventureId(adventureNoteId);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }


        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }

    }
}
