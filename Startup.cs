using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SafetyStream.Startup))]
namespace SafetyStream
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

        }
    }
}
