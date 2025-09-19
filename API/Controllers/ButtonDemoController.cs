using System;
using Application.Demo.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ButtonDemoController: BaseAPiController
{

    [HttpGet]
    public async Task<IActionResult> LongWaitTime()
    {
        var result = await Mediator.Send(new GetLongWaitTime.Query());
        return Ok(result);
    }

}
