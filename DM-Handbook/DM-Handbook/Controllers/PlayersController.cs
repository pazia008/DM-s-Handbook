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


        [HttpGet("{playerId}")]
        public IActionResult Get(int playerId)
        {
            var currentUserProfile = GetCurrentUser();

            if (currentUserProfile == null) return NotFound();

            var tag = _playersRepository.GetById(playerId);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }


        [HttpPost]
        public IActionResult Add(Players player)
        {
            var currentUserProfile = GetCurrentUser();

            player.UserId = currentUserProfile.Id;
            _playersRepository.Add(player);

            return Ok(player);
        }


        [HttpDelete("{playerId}")]
        public IActionResult Delete(int playerId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _playersRepository.Delete(playerId);
            return NoContent();
        }


        [HttpPut("{playerId}")]
        public IActionResult Put(Players players)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _playersRepository.Update(players);
            return NoContent();
        }

        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }

    }
}
