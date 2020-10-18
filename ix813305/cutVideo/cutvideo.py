import cv2
import time
cap = cv2.VideoCapture('rtmp://localhost:1935/live/movie')

# 設定擷取影像的尺寸大小
fps = cap.get(cv2.CAP_PROP_FPS)
size = (int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
        int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)))

# 使用 XVID 編碼
fourcc = cv2.VideoWriter_fourcc(*'XVID')

# 建立 VideoWriter 物件，輸出影片至 output.avi
name = 'video/output_'
index = 0
add = 10
video_name = name+str(index)+".avi"
print("start")
out = cv2.VideoWriter(video_name, fourcc, fps, size)
end = time.time()+add
while(cap.isOpened()):
  ret, frame = cap.read()
  if ret == True:
    # 寫入影格
    out.write(frame)
    # cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
      break
    now = time.time()
    if now>=end:
        out.release()
        video_name = name+str(index)+".avi"
        print(video_name+" finish")
        out = cv2.VideoWriter(video_name, fourcc, fps, size)
        index+=1
        end = now+add
    
   
  else:
    break
print('end')
# 釋放所有資源
cap.release()
out.release()
cv2.destroyAllWindows()