public class Permission
{
    public int Id { get; set; }
    public string PermissionName { get; set; }
    public string Description { get; set; }

    // Navigation property für die viele-zu-viele Beziehung
    public virtual ICollection<SecurityGroup> SecurityGroups { get; set; } = new List<SecurityGroup>();
}