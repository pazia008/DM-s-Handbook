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
    public class AdventureMonstersController : ControllerBase
    {


        private readonly IAdventureMonstersRepository _adventureMonstersRepository;
        private readonly IUserProfilesRepository _userProfilesRepository;

        public AdventureMonstersController(IAdventureMonstersRepository adventureMonstersRepository, IUserProfilesRepository userProfilesRepository)
        {
            _adventureMonstersRepository = adventureMonstersRepository;
            _userProfilesRepository = userProfilesRepository;
        }


        [HttpPost]
        public IActionResult Add(AdventureMonsters adventureMonsters)
        {
            var currentUserProfile = GetCurrentUser();
            _adventureMonstersRepository.AddAdventureMonster(adventureMonsters);

            return Ok(adventureMonsters);
        }


        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }

    }
}
