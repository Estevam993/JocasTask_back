import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FramesService } from './frames.service';
import { CreateFrameDto } from './dto/create-frame.dto';
import { UpdateFrameDto } from './dto/update-frame.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomRequest } from 'src/common/custom-request.interface';

@UseGuards(JwtAuthGuard)
@Controller('frames')
export class FramesController {
  constructor(private readonly framesService: FramesService) {}

  @Post()
  create(@Body() frame: CreateFrameDto, @Req() req: CustomRequest) {
    const userId = req.user.id;
    frame.user_id = userId;
    return this.framesService.create(frame);
  }

  @Get()
  findAll(@Req() req: CustomRequest) {
    const userId = req.user.id;
    return this.framesService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.framesService.findOne(+id);
  }

  @Post('update/:id')
  update(@Param('id') id: string, @Body() updateFrameDto: UpdateFrameDto) {
    return this.framesService.update(+id, updateFrameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() updateFrameDto: UpdateFrameDto) {
    return this.framesService.remove(+id, updateFrameDto);
  }
}
