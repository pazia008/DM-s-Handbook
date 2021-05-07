using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface IAdventureNotesRepository
    {
        List<AdventureNotes> GetAllByUserId(int userId);
        void Add(AdventureNotes adventureNotes);
        void Delete(int adventureNoteId);
        AdventureNotes GetById(int adventureNoteId);
        void Update(AdventureNotes adventureNote);
    }
}