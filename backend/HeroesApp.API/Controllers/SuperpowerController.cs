using HeroesApp.Application.DTOs;
using HeroesApp.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HeroesApp.API.Controllers;

[ApiController]
[Route("[controller]")]
public class SuperpowerController : ControllerBase
{
    private readonly ISuperpowerService _superpowerService;

    public SuperpowerController(ISuperpowerService superpowerService)
    {
        _superpowerService = superpowerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var superpoderes = await _superpowerService.GetAllAsync();
        return Ok(new { success = true, data = superpoderes });
    }
}
