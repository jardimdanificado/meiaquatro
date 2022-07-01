


#if defined(PLATFORM_DESKTOP)
#define GLSL_VERSION            330
#else   // PLATFORM_RPI, PLATFORM_ANDROID, PLATFORM_WEB
#define GLSL_VERSION            100
#endif

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <assert.h>
#include <math.h>

//RAYLIB
#include "./raylib/raylib.h"
#include "./raylib/raymath.h"

//ABIN Files
#include "./abin.h"

#define COR_VERMELHO CLITERAL(Color){235, 64, 52,255}
#define COR_SELECIONADO   CLITERAL(Color){202,137,109,255}
#define COR_SELECIONADO2 CLITERAL(Color){145, 39, 32,255}
#define COR_PRETO CLITERAL(Color){31, 9, 7,255}
#define COR_VAZIO   CLITERAL(Color){55,55,55,255}
#define COR_BRANCO   CLITERAL(Color){250,239,229,255}
#define COR_CINZA   CLITERAL(Color){115,105,97,255}
#define COR_LARANJA   CLITERAL(Color){202,137,109,255}

#define COR_PELE0 CLITERAL(Color){240, 199, 156,255}
#define COR_ROUPA0 CLITERAL(Color){103, 122, 137,255}
#define COR_ROUPA1 CLITERAL(Color){110, 125, 103,255}

#define MQFALSE __INT_MAX__*(-1)
#define MQTRUE __INT_MAX__

#define MAXOBJ 64

unsigned int MAXANIM = 1;

bool MQEXIT = false;

//-----------------------------------
//DATA
//-----------------------------------

struct DATA_IMAGEM
{
    Texture2D textura[MAXOBJ + 1];
};
typedef struct DATA_IMAGEM DATA_IMAGEM;

struct DATA_MAPA
{
    float velocidade;
    int tempoGravit;
    Vector3 posicao;
    float rotacao;
};
typedef struct DATA_MAPA DATA_MAPA;

struct DATA_PLAYER
{
    float velocidade;
    int tempoGravit;
    Vector3 posicao;
    float rotacao;
};
typedef struct DATA_PLAYER DATA_PLAYER;

struct DATA_RENDER_MODEL
{
    bool visible, playing, reverse;
    int modelIndex;
    int currentAnim;
    int currentFrame;
    Color color;
    Vector3 position;
    float rotation;
    char *id;
};
typedef struct DATA_RENDER_MODEL DATA_RENDER_MODEL;

struct DATA_RENDER_TEXT
{
    bool visible;
    int textIndex;
    Vector2 position;
    Color color;
    char* string;
    int fontSize;
    int fontIndex;
    char *id;
};
typedef struct DATA_RENDER_TEXT DATA_RENDER_TEXT;

struct DATA_SESSION_RENDER
{
    DATA_RENDER_MODEL model[MAXOBJ];
    DATA_RENDER_TEXT text[MAXOBJ];
    Color background;
    Camera camera;
};
typedef struct DATA_SESSION_RENDER DATA_SESSION_RENDER;

struct DATA_SESSION_LOADEDNAMES
{
    char model[255],hitbox[255],text[255],event[255];
};
typedef struct DATA_SESSION_LOADEDNAMES DATA_SESSION_LOADEDNAMES;

struct DATA_GAME
{
    DATA_PLAYER personagem[MAXOBJ];
};
typedef struct DATA_GAME DATA_GAME;

struct DATA_FILES
{
    Model model[MAXOBJ];
    BoundingBox hitbox[MAXOBJ];
    BoundingBox eventbox[MAXOBJ];
    Font font[MAXOBJ];
    char text[MAXOBJ][255];
    char lang[MAXOBJ][255];
    ModelAnimation *anim[MAXOBJ];
    Music audio[MAXOBJ];
};
typedef struct DATA_FILES DATA_FILES;

struct DATA_SESSION
{
    DATA_SESSION_RENDER render;
    int ModelCount, HitboxCount, TextCount, LangCount;
    DATA_SESSION_LOADEDNAMES LoadedNames[MAXOBJ];
    long int frame;
};
typedef struct DATA_SESSION DATA_SESSION;

struct DATA
{
    DATA_GAME game;
    DATA_FILES file;
    DATA_SESSION session;
};
typedef struct DATA DATA;



#include "1964.c"