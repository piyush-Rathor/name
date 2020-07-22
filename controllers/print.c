/******************************************************************************

                            Online C Compiler.
                Code, Compile, Run and Debug C program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include<stdio.h>
#include<string.h>
int main()
{
    char a[1000]={' '};
    char b[1000][1000];
    int count=0,j=0,out[500]={0},temp=0,k=0,l=0;
    scanf("%[^\n]%*c",a);

    for(int i=0;i<1000;i++)
    {
        if(a[i]==32)
        {
            if(a[i+1]==32){
            break;
            }
            count++;
            j=0;
        }
        else{
        b[count][j]=a[i];
        out[count]++;
        j++;
        }
    }
    for (int i=0;i<=count;i++)
    {
        for(int j=0;j<out[i];j++)
        {
            printf("%c",b[i][j]);
        }
        if (l<count)
        {
        printf("\n");
        l++;
        }
    }
   return 0; 
}

