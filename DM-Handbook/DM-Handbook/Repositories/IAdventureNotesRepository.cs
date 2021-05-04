using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface IAdventureNotesRepository
    {
        List<AdventureNotes> GetAllByUserId(int userId);
        void Add(AdventureNotes adventureNotes);
    }
}