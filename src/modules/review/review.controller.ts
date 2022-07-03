import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewUpdateReqDto } from './dto/review-update-req.dto';
import { ReviewService } from './review.service';
import { ErrorResponseDto } from '../shared/dto/error-response.dto';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../auth/jwt.guard';
import { ReviewDetailResDto } from './dto/review-detail-res.dto';

@ApiResponse({
  status: 400,
  description: 'BadRequest.',
  type: ErrorResponseDto,
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  type: ErrorResponseDto,
})
@ApiResponse({ status: 403, description: 'Forbidden.', type: ErrorResponseDto })
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('controller-review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly authService: AuthService,
    private readonly reviewService: ReviewService,
  ) {}

  @ApiTags('for-user')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiResponse({
    status: 201,
    description: 'Review information',
    type: ReviewDetailResDto,
  })
  @ApiOperation({
    description: 'Insert a review',
  })
  @Post()
  async insert(@Request() req, @Body() reviewUpdateReqDto: ReviewUpdateReqDto) {
    const newReview = await this.reviewService.insert(
      reviewUpdateReqDto,
      req.user,
    );

    return <ReviewDetailResDto>{
      review: newReview,
    };
  }

  @ApiTags('for-user')
  @ApiTags('for-admin')
  @ApiResponse({
    status: 200,
    description: 'The found record is executed',
    type: Boolean,
  })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @ApiOperation({
    description: 'Delete specific product',
  })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    if (!req.user.isAdmin) return this.reviewService.deleteOne(id, req.user.id);
    else return this.reviewService.deleteOne(id);
  }
}
