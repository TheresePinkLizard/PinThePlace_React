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
}