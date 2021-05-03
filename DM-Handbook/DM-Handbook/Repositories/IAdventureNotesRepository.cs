using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface IAdventureNotesRepository
    {
        List<AdventureCampaign> GetAllByUserId(int userId);
    }
}