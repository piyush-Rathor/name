#include <stdio.h>

int main()
{ int size,num,i,j,left,top,N,z;
int a[100][100];
scanf("%d",&N);
left=0;
size=2*N-1;
top=size-1;

if(size%2==0)
z=size/2;
else z=(size+1)/2;

for(i=1;i<=z;i++,left++,top--)
{ for(j=left;j<=top;j++)
   a[left][j]=N;
  for(j=left+1;j<=top;j++)
   a[j][top]=N;
  for(j=top-1;j>=left;j--)
   a[top][j]=N;
  for(j=top-1;j>=left+1;j--)
   a[j][left]=N;
   N--;
}

for(i=0;i<size;i++)
 {  for(j=0;j<size;j++)
      printf("%d ",a[i][j]);
      printf("\n"); }
  
    return 0;
}