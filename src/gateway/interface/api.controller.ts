import { Controller, Inject, Post, RawBodyRequest, Req } from '@nestjs/common';
import { GatewayService } from '../application/gateway.service';
import { NotifyInfoMapper } from '../application/info/notify.info.mapper';
import { NotifyResponseDto } from './dto/notify.response.dto';
import { NotifyCommandMapper } from '../application/command/notify.command.mapper';
import { NotifyCommand } from '../application/command/notify.command';
import { NotifyRequestDto } from './dto/notify.request.dto';
import { NotifyDtoMapper } from './dto/notify.dto.mapper';

@Controller('gateway/api')
export class ApiController {
  constructor(
    @Inject(GatewayService)
    private readonly gatewayService: GatewayService,
  ) {}

  @Post()
  async notify(@Req() req: RawBodyRequest<Request>) {
    try {
      const messages = NotifyDtoMapper.of(
        NotifyRequestDto.Messages,
        JSON.parse(req.rawBody.toString()),
      );

      // 각 알림 타입별로 알림 메시지 전송
      const info = await this.gatewayService.notify(
        NotifyCommandMapper.of(NotifyCommand.Messages, messages),
      );

      return NotifyInfoMapper.of(NotifyResponseDto.Body, info);
    } catch (e) {
      console.error(`ApiController/notify()`, e);
      return true;
    }
  }
}
