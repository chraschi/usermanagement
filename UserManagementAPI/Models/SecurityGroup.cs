using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class SecurityGroup
{
    public int Id { get; set; }

    [Required]
    public string GroupName { get; set; }

    public ICollection<Permission> Permissions { get; set; }
    public ICollection<User> Users { get; set; }
}
