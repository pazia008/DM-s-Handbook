using System.Collections.Generic;
using DM_Handbook.Models;

namespace DM_Handbook.Repositories
{
    public interface ICampaignsRepository
    {
        Campaigns GetById(int campaignId);
        List<Campaigns> GetAllByUserId(int userId);
        void Add(Campaigns campaigns);
        void Delete(int campaignId);

        void Update(Campaigns campaigns);
    }
}