using System;
using MediatR;
using Microsoft.VisualBasic;

namespace Application.Demo.Queries;

public class GetLongWaitTime
{
    public class Query : IRequest<string> { }

    public class Handler : IRequestHandler<Query, string>   //return string object
    {
        public async Task<string> Handle(Query request, CancellationToken cancellationToken)
        {
            await Task.Delay(3000, cancellationToken);  // 100s
            return ("Done sleep for 100s");
            
        }

    }

}
