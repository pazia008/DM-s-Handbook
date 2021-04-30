using DM_Handbook.Models;
using static DM_Handbook.Models.UserProfiles;

namespace DM_Handbook.Repositories
{
    public interface IUserProfilesRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseId);
    }
}