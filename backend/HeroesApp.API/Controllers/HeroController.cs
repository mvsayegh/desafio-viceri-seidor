using HeroesApp.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class HeroController : ControllerBase
{
    private readonly IHeroService _heroService;

    public HeroController(IHeroService heroService)
    {
        _heroService = heroService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(new { success = true, data = await _heroService.GetAllAsync() });

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var hero = await _heroService.GetByIdAsync(id);
        if (hero == null)
            return NotFound(new { success = false, message = "Herói não encontrado." });

        return Ok(new { success = true, data = hero });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] HeroDto heroDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new
            {
                success = false,
                errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
            });

        try
        {
            var createdHero = await _heroService.CreateAsync(heroDto);
            return Ok(new { success = true, data = createdHero });
        }
        catch (Exception ex)
        {
            var error = ex.InnerException?.Message ?? ex.Message;
            return BadRequest(new { success = false, message = error });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] HeroDto heroDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(new
            {
                success = false,
                errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)
            });

        try
        {
            var updatedHero = await _heroService.UpdateAsync(id, heroDto);
            return Ok(new { success = true, data = updatedHero });
        }
        catch (Exception ex)
        {
            var error = ex.InnerException?.Message ?? ex.Message;
            return BadRequest(new { success = false, message = error });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var result = await _heroService.DeleteAsync(id);
            if (!result)
                return NotFound(new { success = false, message = "Herói não encontrado." });

            return Ok(new { success = true, message = "Herói removido com sucesso." });
        }
        catch (Exception ex)
        {
            var error = ex.InnerException?.Message ?? ex.Message;
            return BadRequest(new { success = false, message = error });
        }
    }
}
