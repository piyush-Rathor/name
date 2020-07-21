#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main() {
    char a[1000];
    int len,b=0,c=0,d=0,e=0,f=0,g=0,h=0,o=0,j=0,k=0;
    scanf("%s",a);
    len=strlen(a);
    for (int i=0;i<len;i++)
    {
        if(a[i]=="0")
        {
            b++;
        }
        if(a[i]=="1")
        {
c++;        }
        if(a[i]=="2")
        {
d++;        }
        if(a[i]=="3")
        {
e++;        }
        if(a[i]=="4")
        {
f++;        }
        if(b[i]=="5")
        {
g++;        }
        if(a[i]=="6")
        {
h++;        }
        if(a[i]=="7")
        {
o++;        }
        if(a[i]=="8")
        {
j++;        }
        if(a[i]=="9")
        {
k++;        }
      
    }
    
        printf("%d %d %d %d %d %d %d %d %d %d",b,c,d,e,f,g,h,o,j,k);
    return 0;
}
