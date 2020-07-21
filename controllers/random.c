#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main() {
    char a[1000];
    int len,b[10]={0,0,0,0,0,0,0,0,0,0};
    len=strlen(a);
    scanf("%s",a);
    for (int i=0;i<len;i++)
    {
        if(a[i]=="0")
        {
            b[0]=b[0]+1;
        }
        if(a[i]=="1")
        {
            b[1]=b[1]+1;
        }
        if(a[i]=="2")
        {
            b[2]=b[2]+1;
        }
        if(a[i]=="3")
        {
            b[3]=b[3]+1;
        }
        if(a[i]=="4")
        {
            b[4]=b[4]+1;
        }
        if(b[i]=="5")
        {
            b[5]=b[5]+1;
        }
        if(a[i]=="6")
        {
            b[6]=b[6]+1;
        }
        if(a[i]=="7")
        {
            b[7]=b[7]+1;
        }
        if(a[i]=="8")
        {
            b[8]=b[8]+1;
        }
        if(a[i]=="9")
        {
            b[9]=b[9]+1;
        }
      
    }
    for(int i=0;i<10;i++){
        printf("%d ",b[i]);
    }
    return 0;
}
