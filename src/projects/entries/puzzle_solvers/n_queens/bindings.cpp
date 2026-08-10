// Emscripten entry point for the browser build.
// Wraps Board so the demo page can call it directly from JavaScript.
#include "Board.h"
#include <emscripten/bind.h>
#include <sstream>
#include <string>

// Runs the solver and returns a JSON string:
// {"solved":bool,"dimension":n,"totalQueens":q,"board":[[0,1,...],...]}
std::string SolveNQueensJSON(int dimension, int totalQueens)
{
    std::ostringstream out;

    if (dimension <= 0 || totalQueens <= 0 || totalQueens > dimension)
    {
        out << "{\"solved\":false,\"error\":\"Board size and queen count must be positive, "
               "and queens cannot exceed the board size.\"}";
        return out.str();
    }

    Board board(dimension, totalQueens);
    bool solved = board.ComputeSolution();

    out << "{\"solved\":" << (solved ? "true" : "false")
        << ",\"dimension\":" << board.GetDimension()
        << ",\"totalQueens\":" << board.GetTotalQueens()
        << ",\"board\":[";

    if (solved)
    {
        const auto &body = board.GetBoardBody();
        for (size_t row = 0; row < body.size(); ++row)
        {
            out << "[";
            for (size_t col = 0; col < body[row].size(); ++col)
            {
                out << body[row][col];
                if (col + 1 < body[row].size())
                    out << ",";
            }
            out << "]";
            if (row + 1 < body.size())
                out << ",";
        }
    }

    out << "]}";
    return out.str();
}

EMSCRIPTEN_BINDINGS(nqueens_module)
{
    emscripten::function("solveNQueens", &SolveNQueensJSON);
}
