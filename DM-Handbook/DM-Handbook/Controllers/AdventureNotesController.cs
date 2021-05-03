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
    public class AdventureNotesController : ControllerBase
    {

        private readonly IAdventureNotesRepository _adventureNotesRepository;
        private readonly IUserProfilesRepository _userProfilesRepository;

        public AdventureNotesController(IAdventureNotesRepository adventureNotesRepository, IUserProfilesRepository userProfilesRepository)
        {
            _adventureNotesRepository = adventureNotesRepository;
            _userProfilesRepository = userProfilesRepository;
        }


        [HttpGet]
        public IActionResult GetAll()
        {
           var notes = _adventureNotesRepository.GetAll();

            return Ok(notes);
        }


        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }


    }
}
