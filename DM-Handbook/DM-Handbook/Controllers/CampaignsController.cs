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
    public class CampaignsController : ControllerBase
    {
        private readonly ICampaignsRepository _campaignsRepository;
        private readonly IUserProfilesRepository _userProfilesRepository;

        public CampaignsController(ICampaignsRepository campaignsRepository, IUserProfilesRepository userProfilesRepository)
        {
            _campaignsRepository = campaignsRepository;
            _userProfilesRepository = userProfilesRepository;
        }



        [HttpGet]
        public IActionResult GetAllByUserId()
        {
            var currentUserProfile = GetCurrentUser();

            if (currentUserProfile == null) return NotFound();

            List<Campaigns> userCampaigns = _campaignsRepository.GetAllByUserId(currentUserProfile.Id);

            return Ok(userCampaigns);
        }





        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }


    }
}
