import numpy as np
from cv2 import cv2 as cv 
import time
import threading
import shutil  
import os

cap = cv.VideoCapture('http://127.0.0.1:7001/live/movie.flv')
fps = cap.get(cv.CAP_PROP_FPS)
size = (int(cap.get(cv.CAP_PROP_FRAME_WIDTH)),
        int(cap.get(cv.CAP_PROP_FRAME_HEIGHT)))
video_name = 'video/movie_'  # 儲存影片名稱
file_type = '.mp4'  # 儲存影片副檔名
write_flag = 0  # 寫入模式 0:等待 1:寫入
video_counter = 0  # 計數儲存影片數量
last_time = 5  # 每段長度(秒)
delay_time = 2  # 間隔長度(秒)

# 使用 XVID 編碼
# fourcc = cv.VideoWriter_fourcc(*'mp4v')
fourcc = cv.VideoWriter_fourcc(*'X264')

# 建立 VideoWriter 物件，輸出影片至 video/movie.flv
# FPS 值為 30.0，解析度為 640x360
# out = cv.VideoWriter('video/movie.mp4', fourcc, fps, size)

def thread():
    print('開啟線程')
    global write_flag
    time.sleep(last_time)
    write_flag = 2
    print('線程結束')

while(cap.isOpened()):
    ret, frame = cap.read()
    if ret == True:
        # 寫入影格
        if (write_flag == 0):
            write_flag = 1
            save_name = video_name + str(video_counter) + file_type
            out = cv.VideoWriter(save_name, fourcc, fps, size)
            t = threading.Thread(target=thread)
            t.start()
            print('writing to ' + save_name)
        elif (write_flag == 1):
            out.write(frame)
        elif (write_flag == 2):
            print('finish ')
            write_flag = 3
            time.sleep(delay_time)
            video_counter = video_counter + 1
            write_flag = 0
            
        # if cv.waitKey(1) & 0xFF == ord('r') and write_flag == 0: # 寫入影格
        #     write_flag = 1
        #     save_name = video_name + str(video_counter) + file_type
        #     out = cv.VideoWriter(save_name, fourcc_avi, fps, size)
        #     print('writing to ' + save_name)
        # if cv.waitKey(1) & 0xFF == ord('t') and write_flag == 1: #關閉影片
        #     write_flag = 0
        #     video_counter = video_counter + 1
        #     print('finish')

        # if (write_flag == 1):
        #     out.write(frame)

        # 顯示(可關)
        cv.imshow('frame', frame)
        if cv.waitKey(1) & 0xFF == ord('q'):
            out.release()
            break
    else:
        break

# 釋放所有資源
print('保存結束')
cap.release()
cv.destroyAllWindows()
