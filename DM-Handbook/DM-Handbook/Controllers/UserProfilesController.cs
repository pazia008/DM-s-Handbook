using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DM_Handbook.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static DM_Handbook.Models.UserProfiles;

namespace DM_Handbook.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfilesController : ControllerBase
    {


        private readonly IUserProfilesRepository _userProfilesRepository;
        public UserProfilesController(IUserProfilesRepository userProfilesRepository)
        {
            _userProfilesRepository = userProfilesRepository;
        }

        [HttpGet("{firebaseId}")]
        public IActionResult GetUserProfile(string firebaseId)
        {
            var userProfile = _userProfilesRepository.GetByFirebaseUserId(firebaseId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }


        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
            
            _userProfilesRepository.Add(userProfile);
            return CreatedAtAction(nameof(GetUserProfile), new { firebaseId = userProfile.FirebaseId }, userProfile);
        }

        // Retrieves the current user object by using the provided firebaseId
        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }


    }
}
