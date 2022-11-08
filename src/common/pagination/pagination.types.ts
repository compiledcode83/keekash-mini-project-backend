import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResultCursor {
  @ApiProperty()
  beforeCursor: string | null;

  @ApiProperty()
  afterCursor: string | null;
}

export class PaginatedResult<T> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty()
  cursor: PaginatedResultCursor;
}
