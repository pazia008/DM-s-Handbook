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
        public IActionResult GetAllByUserId()
        {
            var currentUserProfile = GetCurrentUser();

            if (currentUserProfile == null) return NotFound();

            List<AdventureNotes> userNotes = _adventureNotesRepository.GetAllByUserId(currentUserProfile.Id);

            return Ok(userNotes);
        }



        [HttpGet("{adventureNoteId}")]
        public IActionResult Get(int adventureNoteId)
        {
            var currentUserProfile = GetCurrentUser();

            if (currentUserProfile == null) return NotFound();

            var note = _adventureNotesRepository.GetById(adventureNoteId);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }


        [HttpPost]
        public IActionResult Add(AdventureNotes adventureNotes)
        {
            var currentUserProfile = GetCurrentUser();

            adventureNotes.UserId = currentUserProfile.Id;
            adventureNotes.DateCreated = DateTime.Now;
            _adventureNotesRepository.Add(adventureNotes);

            return Ok(adventureNotes);
        }


        [HttpDelete("{adventureNoteId}")]
        public IActionResult Delete(int adventureNoteId)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _adventureNotesRepository.Delete(adventureNoteId);
            return NoContent();
        }


        [HttpPut("{adventureNoteId}")]
        public IActionResult Put(AdventureNotes adventureNote)
        {
            var user = GetCurrentUser();
            if (user == null) return NotFound();

            _adventureNotesRepository.Update(adventureNote);
            return NoContent();
        }

        private UserProfile GetCurrentUser()
        {
            var firebaseId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfilesRepository.GetByFirebaseUserId(firebaseId);
        }


      

    }
}
