import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { HandlerWithResponse, ResponseWithStatusCode } from "@ooic/router/types";

import { <FTName | pascalcase> } from "~/drivers/sequelize/models/<FTName | pascalcase>";

/**
 * Request handler for destroying an {@link <FTName | pascalcase> <FTName | pascalcase>}.
 * @param request The Express request object.
 * @param response The Express response object.
 * @param next The next middleware function.
 *
 * @description Ensure that the request parameter "id" corresponds to an existing {@link <FTName | pascalcase> <FTName | pascalcase>} and delete it from the database.
 */
export const destroy: RequestHandler = async (request, response, next) => {
  const { id } = request.params;
  try {
    const <FTName | camelcase> = await <FTName | pascalcase>.findByPk(id);

    if (!<FTName | camelcase>) throw new HttpError(StatusCodes.NOT_FOUND);

    <FTName | camelcase>.destroy();
    response.status(StatusCodes.OK).send(<FTName | camelcase>);
  } catch (error) {
    next(error);
  }
};

export default destroy;