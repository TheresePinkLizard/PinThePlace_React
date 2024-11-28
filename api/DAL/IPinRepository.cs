using Microsoft.AspNetCore.Http.Features;
using PinThePlace.Models;

namespace PinThePlace.DAL;

public interface IPinRepository
{
    Task<IEnumerable<Pin>> GetAll();
    Task<Pin?> GetItemById(int id);
    Task<bool> Create(Pin pin);
    Task<bool> Update(Pin pin);
    Task<bool> Delete(int id);

     //For the favorites
    Task<IEnumerable<Favorite>> GetAllFavorites();
    Task<Favorite?> GetFavoriteById(int id);
    Task<bool> SaveFavorite(Favorite favorite);
    Task<bool> UpdateFavorite(Favorite favorite);
    Task<bool> DeleteFavorite(int id);
}
