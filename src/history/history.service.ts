import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { returnSongObject } from "../utils/return-song.object";
import { CreateHistoryDto } from "./dto/create-history.dto";


@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {
  }
  
  async addHistory(createHistoryDto: CreateHistoryDto, id: number) {
    await this.prisma.history.create({
      data: {
        songs: {
          connect: createHistoryDto.songsId.map((songId) => {
            return {
              id: songId
            };
          })
        },
        user: {
          connect: {
            id
          }
        }
      }
    });
    
    return {
      message: "History added"
    };
    
  }
  
  async getHistory(id: number) {
    return this.prisma.history.findMany({
      where: {
        user: {
          id
        }
      },
      select: {
        id: true,
        createdAt: true,
        songs: {
          select: returnSongObject
        }
      }
    });
  }
  
  async getHistoryList(id: number) {
    const history = await this.prisma.history.findMany({
      where: {
        user: {
          id
        }
      },
      take: 10,
      select: {
        userId: false,
        songs: {
          select: returnSongObject
        }
      }
    });
    const list = [];
    for (const item of history) {
      item.songs.forEach((song) => {
        if (list.find((element) => element.title == song.title)) return;
        return list.push(song);
      });
    }
    return list;
  }
  
}
