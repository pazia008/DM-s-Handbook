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
    public class PlayersController : ControllerBase
    {

        private readonly IPlayersRepository _playersRepository;
        private readonly IUserProfilesRepository _userProfilesRepository;

        public PlayersController(IPlayersRepository playersRepository, IUserProfilesRepository userProfilesRepository)
        {
            _playersRepository = playersRepository;
            _userProfilesRepository = userProfilesRepository;
        }



        [HttpGet]
        public IActionResult GetAllByUserId()
        {
            var currentUserProfile = GetCurrentUser();

            if (currentUserProfile == null) return NotFound();

            List<Players> userPlayers = _playersRepository.GetAllByUserId(currentUserProfile.Id);

            return Ok(userPlayers);
        }


        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }

    }
}
