from typing import Any

from fastapi import status
from fastapi.responses import JSONResponse


def success_response(
    *,
    message: str,
    data: Any = None,
    status_code: int = status.HTTP_200_OK,
) -> JSONResponse:
    """
    Standard success response.
    """

    payload = {
        "success": True,
        "message": message,
        "data": data,
    }

    return JSONResponse(
        status_code=status_code,
        content=payload,
    )


def error_response(
    *,
    message: str,
    errors: Any = None,
    status_code: int = status.HTTP_400_BAD_REQUEST,
) -> JSONResponse:
    """
    Standard error response.
    """

    payload = {
        "success": False,
        "message": message,
        "errors": errors,
    }

    return JSONResponse(
        status_code=status_code,
        content=payload,
    )