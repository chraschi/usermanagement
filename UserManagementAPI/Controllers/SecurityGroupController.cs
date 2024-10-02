using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class SecurityGroupController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SecurityGroupController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/securitygroup
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SecurityGroup>>> GetSecurityGroups()
    {
        return await _context.SecurityGroups
            .Include(sg => sg.Permissions) // Zieht die Berechtigungen mit ein
            .Include(sg => sg.Users)       // Zieht die Benutzer mit ein
            .ToListAsync();
    }

    // GET: api/securitygroup/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<SecurityGroup>> GetSecurityGroup(int id)
    {
        var securityGroup = await _context.SecurityGroups
            .Include(sg => sg.Permissions) // Zieht die Berechtigungen mit ein
            .Include(sg => sg.Users)       // Zieht die Benutzer mit ein
            .FirstOrDefaultAsync(sg => sg.Id == id);

        if (securityGroup == null)
        {
            return NotFound();
        }

        return securityGroup;
    }

    // POST: api/securitygroup
    [HttpPost]
    public async Task<ActionResult<SecurityGroup>> CreateSecurityGroup(SecurityGroup securityGroup)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.SecurityGroups.Add(securityGroup);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSecurityGroup), new { id = securityGroup.Id }, securityGroup);
    }

    // PUT: api/securitygroup/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSecurityGroup(int id, SecurityGroup securityGroup)
    {
        if (id != securityGroup.Id)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Entry(securityGroup).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SecurityGroupExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/securitygroup/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSecurityGroup(int id)
    {
        var securityGroup = await _context.SecurityGroups.FindAsync(id);
        if (securityGroup == null)
        {
            return NotFound();
        }

        _context.SecurityGroups.Remove(securityGroup);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SecurityGroupExists(int id)
    {
        return _context.SecurityGroups.Any(e => e.Id == id);
    }
}
