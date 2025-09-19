using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseAPiController : ControllerBase
    {

        // single ?: optional; _: private properties
        private IMediator? _mediator;

        // double ??: to check if the object is null, if yes, execute instruction in right side
        // double ??=: to check if the object is null, if yes, assign whatever from the right of = to the _mediator
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
        ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}
