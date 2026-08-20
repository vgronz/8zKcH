(() => {
  // ../pc/src/agent/src/core/libs.js
  var _base = null;
  function mappedModule(name) {
    const suffix = "/" + name.toLowerCase();
    try {
      for (const range of Process.enumerateRanges(
        {
          protection: "r--",
          coalesce: false
        }
      )) {
        const path = range.file && range.file.path;
        if (typeof path !== "string" || range.file.offset !== 0) continue;
        if (path.toLowerCase().endsWith(suffix)) {
          return {
            name,
            path,
            base: range.base,
            size: range.size
          };
        }
      }
    } catch (_) {
    }
    return null;
  }
  function mappedFromProc(name) {
    try {
      const text = File.readAllText("/proc/self/maps");
      const needle = "/" + name.toLowerCase();
      for (const line of text.split("\n")) {
        const path = line.slice(line.lastIndexOf(" ") + 1).trim();
        if (!path.toLowerCase().endsWith(needle)) continue;
        const parts = line.split(/\s+/);
        if (parts.length < 3 || parts[2] !== "00000000") continue;
        const start = parts[0].split("-")[0];
        return {
          name,
          path,
          base: ptr("0x" + start),
          size: 0
        };
      }
    } catch (_) {
    }
    return null;
  }
  function engineModule() {
    return Process.findModuleByName("libg.so") || mappedModule("libg.so") || mappedFromProc("libg.so");
  }
  function libg(intervalMs = 50) {
    if (_base) return Promise.resolve(_base);
    let mod = engineModule();
    if (mod) {
      _base = mod.base;
      return Promise.resolve(_base);
    }
    return new Promise((resolve) => {
      const id = setInterval(() => {
        mod = engineModule();
        if (mod) {
          clearInterval(id);
          _base = mod.base;
          resolve(_base);
        }
      }, intervalMs);
    });
  }

  // ../pc/src/agent/src/core/offsets.js
  var offsets = Object.freeze(
    {
      LogicBattleModeClient_update: 12720732,
      BattleMode_getInstance: 10204648,
      LogicGameObjectClient_getX: 11920460,
      LogicGameObjectClient_getY: 11920468,
      LogicGameObjectClient_getZ: 11920476,
      LogicBattleModeClient_getOwnCharacter: 12728752,
      BattleScreen_activateSkill: 8769160,
      StringCtor: 15300508,
      Gui_showFloaterTextAtDefaultPos: 8891228,
      LogicBattleModeClient_getOwnPlayerTeam: 12727816,
      LogicGameObjectClient_getGlobalID: 11920376,
      LogicGameObjectClient_getData: 11919660,
      LogicProjectileData_getRadius: 11514224,
      LogicProjectileData_getSpeed: 11514096,
      LogicProjectileData_getRendering: 11514564,
      LogicCharacterData_getCollisionRadius: 11222668,
      decoratedTextFieldSetPlayerName: 6074656,
      TextField_setText_ui: 6074656,
      TextField_setText: 13518576,
      handleJoystick: 6007712,
      ClientInput_constructor_int: 12476968,
      ClientInputManager_addInput: 8322096,
      LogicBattleModeClient_setClientPredictionMoveTo: 12729108,
      Sprite_Sprite: 13396068,
      TileMap_Width: 196,
      TileMap_Height: 200,
      TileMap_TilesArray: 32,
      TileTypeData_BlocksMovement: 86,
      TileTypeData_BlocksProjectiles: 87,
      LogicTileData__blocksProjectiles: 11671328,
      BattleMode_objectManagerPtr: 40,
      BattleMode_clientInputManager: 88,
      ObjectManager_objectsArray: 0,
      ObjectManager_count: 12,
      ObjectManager_ptrStride: 8,
      GameObj_team: 64,
      LogicGameObjectClient_ownerIndex: 60,
      GameObj_deadFlag: 208,
      CharData_speed: 452,
      CharData_brawlerId: 24,
      Projectile_isIndirect: 184,
      Projectile_angle: 468,
      LogicCharacterClientOwn_speedBuff: 508,
      LogicProjectileClient_ownerTeam: 64,
      LogicProjectileClient_dataName: 88,
      Joy_currentX: 148,
      Joy_currentY: 152,
      Joy_centerX: 156,
      Joy_centerY: 160,
      Joy_isDragging: 16,
      ScString_length: 4,
      ScString_data: 8,
      ScString_destruct: 15300236,
      ResourceManager__isResourceLoaded: 13131604,
      GameMain__update: 5046820,
      DecalManager__DecalManager: 5445820,
      LogicProjectileData__IsOwnTeamProjectile: 5447588,
      GameObjectManager__GameObjectManager: 5451664,
      Projectile_ctor: 5476852,
      Projectile__update: 5479428,
      RenderSystem__RenderSystem: 5490044,
      CombatHUD__toggleEditing: 5869476,
      BattleScreen__updateCameraParameters: 8745684,
      Character__updateHealthBar: 5919212,
      CombatHUD__setShootStickState: 5991932,
      CombatHUD__setMoveStickState: 5992108,
      GUI__getDefaultFloaterPos: 8767676,
      GUI__showFloaterTextAt: 6048740,
      GUI__showPopup: 6052152,
      GameButtonCtor: 6073036,
      DropGUIContainer__ctorFromExport: 5298716,
      DropGUIContainer_movieClip: 128,
      GameSliderComponent__GameSliderComponent: 6090264,
      GameSliderComponent__setValueBounds: 6092316,
      MapEditorModifierItem__MapEditorModifierItem: 7527720,
      MapEditorModifierPopup__MapEditorModifierPopup: 7531584,
      MapEditorModifierPopup__addModifierItem: 7534044,
      PopupBase__PopupBase: 7596944,
      MessageManager__receiveMessage: 8451172,
      BattleScreen__BattleScreen: 8729276,
      BattleScreen__stopWithStick: 8756144,
      BattleScreen__handleTouchReleased: 8763156,
      BattleScreen__update: 5883724,
      BattleScreen_spectateWidget: 1e3,
      BattleScreen_spectateTextField: 1016,
      BattleScreen__updateAutoshoot: 8789456,
      BattleScreen_getClosestTargetForAutoshoot: 8875696,
      BattleScreen__updateMovement: 8797052,
      BattleScreen__tryToActivateSkill: 8832160,
      BattleScreen__shouldShowAccessoryButton: 8842100,
      BattleScreen__calculateProjectilePath: 8860260,
      BattleScreen__joystickToWorld: 8878932,
      GameScreen__getLogicBattle: 8890956,
      MapEditorScreen__initRenderSystem: 8971728,
      MapEditorScreen__initItems: 8972084,
      MapEditorScreen__initCharacters: 8972288,
      GameSettings__isFixedJoystickEnabled: 10129828,
      BattleMode__enter: 10210980,
      BattleMode__addResourcesToLoad: 10211580,
      GameStateManager__getInstance: 10242104,
      GameStateManager__isState: 10245612,
      HomeMode__getInstance: 10254800,
      StringTable__getMovieClip: 10316436,
      MovieClipHelper__setTextAndScaleIfNecessary: 10494416,
      LogicTile__setData: 10820996,
      LogicTileMap__LogicTileMap: 5451964,
      LogicTileMap__isPlayerLineOfSightClear: 10841592,
      LogicTileMap__isPlayerLineOfSightClear1: 10841640,
      LogicDataTables__getOpenTileData: 11362848,
      LogicDataTables__getBaseTileData: 11362932,
      LogicDataTables__getSiegeBoltTileData: 11363016,
      LogicProjectileData__isBeam: 11514532,
      LogicCharacterData_getSpeed: 11222080,
      LogicProjectileData__getNumEarlyTicks: 11515272,
      LogicSkillData__getActiveTime: 11592524,
      LogicSkillData__getRechargeTime: 11593312,
      LogicSkillData__getMaxCharge: 11593328,
      LogicSkillData__getMsBetweenAttacks: 11593368,
      LogicSkillData__getCastingRange: 11592580,
      LogicTileData__blocksMovement: 11671320,
      LogicCharacterClient__getCarryableData: 11733896,
      LogicCharacterClient__getWeaponSkill: 11737592,
      LogicCharacterClient__canMoveAndUseThisSkillSimultaneously: 11737616,
      LogicCharacterClient__getLinkedCarryable: 11738428,
      LogicCharacterClient__getCurrentActiveOrCastingSkill: 11740732,
      LogicCharacterClient__getSkillAt: 11737456,
      LogicCharacterClient_hyperActive: 798,
      LogicCharacterClient_body: 1e3,
      LogicSkillClient__getData: 12037452,
      LogicSkillClient__canActivate: 12037836,
      LogicSkillData__getBehaviour: 11594620,
      LogicSkillData__getLinkedSkill: 11594636,
      LogicSkillData_kind: 428,
      SkillCommandTypeTable: 1591072,
      ClientInput_skillData: 64,
      LogicCharacterClientOwn__clientPredictionPauseMovementForSkillCasting: 11749104,
      LogicCharacterClientOwn__clientPredictionUpdateAttackDirection: 11749208,
      LogicGameObjectManagerClient__LogicGameObjectManagerClient: 11921292,
      LogicGameObjectManagerClient__getGameObjects: 11922344,
      LogicGameObjectManagerClient__findGameObject: 11934884,
      LogicGameObjectServer__getData: 11971756,
      LogicProjectileServer__shootProjectile: 12028568,
      LogicProjectileServer__runEarlyTicks: 12032600,
      GlobalID__getInstanceID: 12270956,
      LogicPlayerMap__save: 12307676,
      LogicPlayerMapUtil__tileDataToTileCode: 12323568,
      AnalyticEvent__AnalyticEvent: 12427732,
      AnalyticEvent__setString: 12427972,
      LogicBattleModeClient__LogicBattleModeClient: 12718576,
      LogicBattleModeClient__setRandomSeed: 12719092,
      LogicBattleModeClient__setPlayerAvatar: 12720492,
      LogicBattleModeClient__getOwnPlayerIndex: 12727808,
      LogicBattleModeClient__getTileMap: 12728624,
      SetClientPrediction: 12729108,
      ScrollArea__scrollTo: 13084836,
      StringTable_getMovieClip: 13132148,
      DisplayObject__setXY: 13300400,
      DisplayObject__removeFromParent: 13301260,
      MovieClip__getTextFieldByName: 13328148,
      Sprite__addChild: 13396608,
      Sprite__addChildAt: 13396616,
      Sprite__removeChild: 13397348,
      ScrollArea__updateBounds: 13539380,
      ScrollArea__addContent: 7168544,
      ScrollArea__removeAllContent: 13540064,
      CSVRow__getIntegerValueAt: 13595580,
      CSVRow__getName: 13595468,
      CSVRow__getValueAt: 13595596,
      CSVRow__getBooleanValueAt: 13595564,
      CSVTable__getColumnIndexByName: 13597644,
      LogicJSONObject__put: 13137692,
      LogicRandom__setIteratedRandomSeed: 13637604,
      LogicCompressedString__LogicCompressedString: 13719920,
      LogicLongToCodeConverterUtil__LogicLongToCodeConverterUtil: 13827152,
      LogicLongToCodeConverterUtil__convert: 13725900,
      LogicLongToCodeConverterUtil__toCode: 8674692,
      ResourceListener__addFile: 13846968,
      String__format: 15311728,
      FramerateManager__setSegment: 15350876,
      FramerateManager__setLimit: 15352160,
      FramerateManager_targetFps: 19855912,
      Application__copyString: 15752096,
      HeroData_namePtr: 72,
      BattleScreen_aimX: 3964,
      BattleScreen_aimY: 3968,
      BattleScreen_aimTargetId: 3812,
      BattleScreen_fireWrapperFn: 8769692,
      ClientInput_x: 12,
      ClientInput_y: 16,
      Message_port: 144,
      Message_ipPtr: 152,
      SockAddr_portHi: 2,
      SockAddr_portLo: 3,
      SockAddr_addr0: 4,
      SockAddr_addr1: 5,
      SockAddr_addr2: 6,
      SockAddr_addr3: 7,
      Stage_addChild: 13420988,
      Stage_spriteContainer: 168,
      Sprite_childCount: 78,
      Sprite_childArray: 80,
      GameButton_setText: 6074656,
      nativeCopyToClipboard: 15339520,
      BattleScreen_screenWidth: 2276,
      BattleScreen_screenHeight: 2280,
      BattleScreen_viewMatrix: 2120,
      BattleScreen_cameraMode: 2316,
      ResourceManager__getCSV: 13139292,
      VTABLE_PROJECTILE_DATA: 18907296,
      StageInstanceGlobalPtr: 19872960,
      MovieClip__gotoAndStopFrameIndex: 13324400,
      MovieClip_gotoAndStop: 13324400,
      BattleMode_hashEnabled: 112,
      BattleMode_hashKey: 96,
      ClientInput_typeConstantTable: 2066204,
      ClientInput_hashInnerMask: 1585040,
      ClientInput_hashOuterMask: 1589168,
      BattleScreen_autoFireBtnHeld: 3913,
      BattleScreen_attackJoyHeld: 3914,
      BattleScreen_ultiJoyHeld: 3915,
      BattleScreen_movePending: 3919,
      LogicCharacterClient__isImmuneOrUntargetable: 11740276,
      operator_new: 18503520,
      TeamChatMessage_messageOffset: 144,
      TeamChatMessage__ctor: 12399612,
      TeamSetMemberReadyMessage_stateOffset: 144,
      TeamSetMemberReadyMessage__ctor: 12413776,
      MessageManager_instance: 19852672,
      MessageManager__sendMessage: 8450940,
      StartSpectateMessage__ctor: 12614388,
      HashTagCodeGenerator__ctor: 13003256,
      HashTagCodeGenerator__toId: 13721472,
      Gui_getInstance: 5674712,
      PiranhaMessage_ctor: 13638644,
      LogicSkillData__getProjectileData: 11593196,
      Name_setupDecorated: 6035012,
      Name_applyDecoration: 6035116,
      LogicDataTables_tableArray: 19860136,
      LogicDataTable_findByName: 48,
      GRADIENT_TABLE_INDEX: 46,
      VTABLE_GRADIENT_DATA: 18901040,
      VTABLE_DECORATED_TEXT_FIELD: 18554440,
      VTABLE_TEXT_FIELD: 18975784,
      DisplayObject_parent: 56,
      DisplayObject_isMovieClipSlot: 128,
      DecoratedTextField_marker: 68,
      DecoratedTextField_text: 224,
      DecoratedTextField_gradient: 616,
      AllianceManager__startSpectate: 8678652,
      AllianceManager_instance: 19853840,
      ClientInputMessage_sendMovement: 5843744,
      CombatHUD__update: 5910972,
      CombatHUD__sendPinCommand: 5874388,
      CombatHUD__sendSprayCommand: 5876700,
      CustomButton_onButtonPressed: 6075140,
      DisplayObject_x: 32,
      DisplayObject_y: 36,
      DisplayObject_scaleX: 16,
      DisplayObject_scaleY: 28,
      DisplayObject_visible: 8,
      GUI_spriteContainer: 160,
      HashTagCodeGenerator__dtor: 13003324,
      HashTagCodeGenerator__isValid: 13003620,
      LogicGameModeUtil__isTileOnPoisonArea: 13016112,
      LogicTileMap_getTile: 10827572,
      LogicProjectileClient_ctor: 11989404,
      LogicProjectileClient_destruct: 11989516,
      LogicProjectileClient_getData: 11990380,
      LogicProjectileClient_getTargetX: 11990856,
      LogicProjectileClient_getTargetY: 11990864,
      LogicProjectileData__getSpawnAreaEffect: 11514452,
      AreaEffectData__getRadius: 11109908,
      AreaEffectData__getActiveTimeMs: 11109900,
      LogicData_getName: 11289840,
      MapEditorScreen__updateCameraParameters: 8971208,
      MovieClip__getChildClipByName: 13327020,
      MovieClip__setChildVisible: 13328672,
      MovieClip_frameCount: 158,
      Screen__getDpiClass: 15366028,
      Screen__getHeight: 15365296,
      Screen__getWidth: 15365284,
      Screen_heightGlobal: 19935620,
      Screen_widthGlobal: 19935616,
      VTABLE_CHARACTER_DATA: 18898944
    }
  );

  // ../pc/src/agent/src/core/functions.js
  var base = null;
  var _n = null;
  function _nf(name, ret, args) {
    const off2 = offsets[name];
    if (typeof off2 !== "number" || off2 <= 0) return null;
    try {
      return new NativeFunction(base.add(off2), ret, args);
    } catch (_) {
      return null;
    }
  }
  function initFunctions(baseIn) {
    if (_n) return _n;
    base = baseIn;
    _n = {
      BattleMode_getInstance: _nf("BattleMode_getInstance", "pointer", []),
      LogicGameObjectClient_getX: _nf("LogicGameObjectClient_getX", "int32", ["pointer"]),
      LogicGameObjectClient_getY: _nf("LogicGameObjectClient_getY", "int32", ["pointer"]),
      LogicGameObjectClient_getZ: _nf("LogicGameObjectClient_getZ", "int32", ["pointer"]),
      LogicBattleModeClient_getOwnCharacter: _nf("LogicBattleModeClient_getOwnCharacter", "pointer", ["pointer"]),
      LogicBattleModeClient_setClientPredictionMoveTo: _nf("LogicBattleModeClient_setClientPredictionMoveTo", "void", ["pointer", "int", "int", "int"]),
      ClientInput_constructor_int: _nf("ClientInput_constructor_int", "pointer", ["pointer", "int"]),
      ClientInputManager_addInput: _nf("ClientInputManager_addInput", "void", ["pointer", "pointer"]),
      LogicGameObjectClient_getGlobalID: _nf("LogicGameObjectClient_getGlobalID", "uint32", ["pointer"]),
      LogicBattleModeClient_getOwnPlayerTeam: _nf("LogicBattleModeClient_getOwnPlayerTeam", "uint32", ["pointer"]),
      LogicBattleModeClient_getOwnPlayerIndex: _nf("LogicBattleModeClient__getOwnPlayerIndex", "int32", ["pointer"]),
      LogicGameObjectClient_getData: _nf("LogicGameObjectClient_getData", "pointer", ["pointer"]),
      LogicProjectileData_getSpeed: _nf("LogicProjectileData_getSpeed", "uint32", ["pointer"]),
      LogicProjectileData_getRadius: _nf("LogicProjectileData_getRadius", "uint32", ["pointer"]),
      LogicProjectileData_getSpawnAreaEffect: _nf("LogicProjectileData__getSpawnAreaEffect", "pointer", ["pointer"]),
      AreaEffectData_getRadius: _nf("AreaEffectData__getRadius", "int32", ["pointer"]),
      AreaEffectData_getActiveTimeMs: _nf("AreaEffectData__getActiveTimeMs", "int32", ["pointer"]),
      LogicProjectileData_getRendering: _nf("LogicProjectileData_getRendering", "int32", ["pointer"]),
      LogicProjectileData_isBeam: _nf("LogicProjectileData__isBeam", "bool", ["pointer"]),
      LogicCharacterData_getSpeed: _nf("LogicCharacterData_getSpeed", "int32", ["pointer"]),
      LogicCharacterData_getCollisionRadius: _nf("LogicCharacterData_getCollisionRadius", "uint32", ["pointer"]),
      BattleScreen_getLogicBattleModeClient: _nf("GameScreen__getLogicBattle", "pointer", ["pointer"]),
      LogicBattleModeClient_getTileMap: _nf("LogicBattleModeClient__getTileMap", "pointer", ["pointer"]),
      LogicProjectileClient_getData: _nf("LogicProjectileClient_getData", "pointer", ["pointer"]),
      LogicProjectileClient_getTargetX: _nf("LogicProjectileClient_getTargetX", "int32", ["pointer"]),
      LogicProjectileClient_getTargetY: _nf("LogicProjectileClient_getTargetY", "int32", ["pointer"]),
      LogicCharacterClient_getWeaponSkill: _nf("LogicCharacterClient__getWeaponSkill", "pointer", ["pointer"]),
      LogicSkillData_getCastingRange: _nf("LogicSkillData__getCastingRange", "int32", ["pointer"]),
      LogicCharacterClient_getLinkedCarryable: _nf("LogicCharacterClient__getLinkedCarryable", "pointer", ["pointer", "pointer"]),
      LogicSkillData_getProjectileData: _nf("LogicSkillData__getProjectileData", "pointer", ["pointer", "int"]),
      LogicSkillClient_getData: _nf("LogicSkillClient__getData", "pointer", ["pointer", "int"]),
      LogicData_getName: _nf("LogicData_getName", "pointer", ["pointer"]),
      StringCtor: _nf("StringCtor", "pointer", ["pointer", "pointer"]),
      ScString_destruct: _nf("ScString_destruct", "pointer", ["pointer"]),
      TextField_setText: _nf("TextField_setText", "pointer", ["pointer", "pointer"]),
      LogicCharacterClient_isImmuneOrUntargetable: _nf("LogicCharacterClient__isImmuneOrUntargetable", "bool", ["pointer"]),
      LogicSkillData_getMsBetweenAttacks: _nf("LogicSkillData__getMsBetweenAttacks", "int", ["pointer"]),
      LogicSkillData_getBehaviour: _nf("LogicSkillData__getBehaviour", "int", ["pointer"]),
      LogicSkillData_getLinkedSkill: _nf("LogicSkillData__getLinkedSkill", "pointer", ["pointer"]),
      LogicCharacterClient_getSkillAt: _nf("LogicCharacterClient__getSkillAt", "pointer", ["pointer", "int"]),
      LogicSkillClient_canActivate: _nf("LogicSkillClient__canActivate", "bool", ["pointer", "pointer", "pointer"]),
      BattleScreen_fireWrapper: _nf("BattleScreen_fireWrapperFn", "int", ["pointer", "pointer"]),
      CombatHUD_sendPinCommand: _nf("CombatHUD__sendPinCommand", "void", ["int"]),
      CombatHUD_sendSprayCommand: _nf("CombatHUD__sendSprayCommand", "void", ["int"]),
      MovieClip_gotoAndStopFrameIndex: _nf("MovieClip__gotoAndStopFrameIndex", "pointer", ["pointer", "int"]),
      ResourceManager_isResourceLoaded: _nf("ResourceManager__isResourceLoaded", "pointer", ["pointer", "int"]),
      DropGUIContainer_ctorFromExport: _nf("DropGUIContainer__ctorFromExport", "pointer", ["pointer", "pointer", "pointer"]),
      MovieClip_getTextFieldByName: _nf("MovieClip__getTextFieldByName", "pointer", ["pointer", "pointer"]),
      Stage_addChild: _nf("Stage_addChild", "pointer", ["pointer", "pointer"]),
      TeamChatMessage_ctor: _nf("TeamChatMessage__ctor", "void", ["pointer"]),
      MessageManager_sendMessage: _nf("MessageManager__sendMessage", "void", ["pointer", "pointer"]),
      Name_setupDecorated: _nf("Name_setupDecorated", "pointer", ["pointer", "pointer", "pointer"]),
      operator_new: _nf("operator_new", "pointer", ["ulong"])
    };
    Object.freeze(_n);
    return _n;
  }
  function getFunctions() {
    if (!_n) throw new Error("Functions not initialized! Call initFunctions(base) first.");
    return _n;
  }
  function getBase() {
    if (!base) throw new Error("Functions not initialized! Call initFunctions(base) first.");
    return base;
  }

  // ../pc/src/agent/src/core/scstring.js
  var INLINE_MAX_LENGTH = 7;
  var DEFAULT_MAX_LENGTH = 256;
  var SCSTRING_SIZE = 32;
  function readScString(value, maxLength = DEFAULT_MAX_LENGTH) {
    try {
      if (!value || value.isNull()) return null;
      const length = value.add(offsets.ScString_length).readS32();
      if (length <= 0 || length > maxLength) return null;
      const data = length <= INLINE_MAX_LENGTH ? value.add(offsets.ScString_data) : value.add(offsets.ScString_data).readPointer();
      if (!data || data.isNull()) return null;
      return data.readUtf8String(length);
    } catch (_) {
      return null;
    }
  }
  function withScString(text, fn) {
    const fns = getFunctions();
    if (!fns.StringCtor || !fns.ScString_destruct) return null;
    const sc = Memory.alloc(SCSTRING_SIZE);
    fns.StringCtor(sc, Memory.allocUtf8String(text));
    try {
      return fn(sc);
    } finally {
      fns.ScString_destruct(sc);
    }
  }

  // ../pc/src/agent/src/core/csv.js
  var _getValueAt = null;
  var _getIntegerValueAt = null;
  var _getRowName = null;
  var _getCSV = null;
  var ROW_TABLE_ARRAY_PTR = 72;
  var ROW_TABLE_ROW_STRIDE = 8;
  var ROW_TABLE_ROW_COUNT = 84;
  var _csvCache = /* @__PURE__ */ new Map();
  function initCSV(base2) {
    _getValueAt = new NativeFunction(
      base2.add(offsets.CSVRow__getValueAt),
      "pointer",
      ["pointer", "int"]
    );
    _getIntegerValueAt = new NativeFunction(
      base2.add(offsets.CSVRow__getIntegerValueAt),
      "int",
      ["pointer", "int"]
    );
    _getRowName = new NativeFunction(
      base2.add(offsets.CSVRow__getName),
      "pointer",
      ["pointer"]
    );
    _getCSV = new NativeFunction(
      base2.add(offsets.ResourceManager__getCSV),
      "pointer",
      ["pointer"]
    );
  }
  var CSVRow = class {
    constructor(pointer) {
      this.ptr = pointer;
    }
    getValueAt(column) {
      return readScString(_getValueAt(this.ptr, column));
    }
    getIntegerValueAt(column) {
      return _getIntegerValueAt(this.ptr, column);
    }
    getName() {
      return readScString(_getRowName(this.ptr));
    }
  };
  var CSVTable = class {
    constructor(pointer) {
      this.ptr = pointer;
    }
    getRowAt(index) {
      try {
        const rowsArray = this.ptr.add(ROW_TABLE_ARRAY_PTR).readPointer();
        const rowPtr = rowsArray.add(ROW_TABLE_ROW_STRIDE * index).readPointer();
        if (!rowPtr || rowPtr.isNull()) return null;
        return new CSVRow(rowPtr);
      } catch (_) {
        return null;
      }
    }
    getRowCount() {
      try {
        return this.ptr.add(ROW_TABLE_ROW_COUNT).readS32();
      } catch (_) {
        return 0;
      }
    }
  };
  function loadCSV(filename) {
    if (!_getCSV) return null;
    const cached = _csvCache.get(filename);
    if (cached) return cached;
    try {
      const table = withScString(filename, (sc) => {
        const nodePtr = _getCSV(sc);
        if (!nodePtr || nodePtr.isNull()) return null;
        const tablePtr = nodePtr.readPointer();
        if (!tablePtr || tablePtr.isNull()) return null;
        return new CSVTable(tablePtr);
      });
      if (table) _csvCache.set(filename, table);
      return table;
    } catch (_) {
      return null;
    }
  }

  // ../pc/src/agent/src/core/dataTables.js
  var _base2 = null;
  function initDataTables(base2) {
    _base2 = base2;
  }
  function getDataTable(index) {
    if (!_base2) return null;
    try {
      const slot = _base2.add(offsets.LogicDataTables_tableArray).add(index * Process.pointerSize);
      const table = slot.readPointer();
      return table.isNull() ? null : table;
    } catch (_) {
      return null;
    }
  }
  function findDataByName(table, name) {
    try {
      const lookup = table.readPointer().add(offsets.LogicDataTable_findByName).readPointer();
      if (lookup.isNull()) return null;
      const call = new NativeFunction(lookup, "pointer", ["pointer", "pointer", "pointer"]);
      const item = withScString(name, (sc) => call(table, sc, NULL));
      return item && !item.isNull() ? item : null;
    } catch (_) {
      return null;
    }
  }

  // ../pc/src/agent/src/utils/brawlerName.js
  var ALIASES = {
    "8-BIT": "8BIT",
    EL_PRIMO: "PRIMO",
    ELPRIMO: "PRIMO",
    MR_P: "MRP",
    "MR.P": "MRP",
    LARRY_AND_LAWRIE: "TWINS",
    LOLA: "LOLLA",
    MELODIE: "MELODY",
    JESSIE: "JESS",
    DYNAMIKE: "MIKE",
    DARRYL: "BARRELBOT",
    HANK: "FISHTANK",
    MOE: "DIGGER",
    GLOWY: "GLOWBERT",
    BOLT: "BOLDER",
    KENJI: "SAMURAI",
    TARA: "TARO",
    RICO: "RICK",
    STARR_NOVA: "STELLA",
    PAM: "MJ",
    SAM: "BRONSON",
    "JAE-YONG": "JAE",
    JAE_YONG: "JAE"
  };
  function canonBrawlerName(name) {
    if (!name) return null;
    const upper = String(name).trim().toUpperCase().replace(/\s+/g, "_");
    return ALIASES[upper] || upper;
  }

  // ../pc/src/agent/src/utils/logger.js
  var LEVEL_DEBUG = "debug";
  var LEVEL_INFO = "info";
  var LEVEL_WARN = "warn";
  var LEVEL_ERROR = "error";
  var BATCH_SIZE = 32;
  var FLUSH_DELAY_MS = 100;
  var MAX_PENDING = 512;
  var EVERY_COOLDOWN_MS = 100;
  var _enabled = false;
  var _pending = [];
  var _timer = null;
  var _repeatCounts = /* @__PURE__ */ Object.create(null);
  var _repeatAt = /* @__PURE__ */ Object.create(null);
  function _flush() {
    _timer = null;
    if (!_pending.length) return;
    const entries = _pending;
    _pending = [];
    try {
      send(
        {
          type: "LOG_BATCH",
          entries
        }
      );
    } catch (_) {
    }
  }
  function _push(level, message, data) {
    if (!_enabled) return;
    const entry = {
      lvl: level,
      msg: String(message || "")
    };
    if (data !== void 0) entry.data = data;
    _pending.push(entry);
    if (_pending.length >= MAX_PENDING) _pending.splice(0, _pending.length - MAX_PENDING);
    if (_pending.length >= BATCH_SIZE) {
      if (_timer !== null) {
        clearTimeout(_timer);
        _timer = null;
      }
      _flush();
    } else if (_timer === null) {
      _timer = setTimeout(_flush, FLUSH_DELAY_MS);
    }
  }
  function logInfo(message, data) {
    _push(LEVEL_INFO, message, data);
  }
  function logWarn(message, data) {
    _push(LEVEL_WARN, message, data);
  }
  function logError(message, data) {
    _push(LEVEL_ERROR, message, data);
  }
  function logEvery(interval, message, data) {
    if (!_enabled) return;
    const key = String(message || "");
    const count = (_repeatCounts[key] || 0) + 1;
    _repeatCounts[key] = count;
    if (count % (interval | 0 || 1) !== 0) return;
    const now = Date.now();
    if (now - (_repeatAt[key] || 0) < EVERY_COOLDOWN_MS) return;
    _repeatAt[key] = now;
    _push(LEVEL_DEBUG, message, data);
  }

  // ../pc/src/agent/src/utils/flags.js
  var FEATURE_NAMES = [
    "aimbot",
    "dodgesex",
    "spinner",
    "killaura",
    "camera",
    "spray",
    "pin",
    "brawltv",
    "spec",
    "chatspam",
    "fps",
    "gradient",
    "holdshoot",
    "speedhack"
  ];
  var FLAG_OF = {};
  var state = {};
  FEATURE_NAMES.forEach((name, index) => {
    FLAG_OF[name] = 1 << index;
    state[name] = false;
  });
  var FLAG_AIMBOT = FLAG_OF.aimbot;
  var FLAG_AUTODODGE = FLAG_OF.autododge;
  var FLAG_ESP = FLAG_OF.esp;
  var FLAG_SPINNER = FLAG_OF.spinner;
  var FLAG_KILLAURA = FLAG_OF.killaura;
  var FLAG_SPRAY = FLAG_OF.spray;
  var FLAG_PIN = FLAG_OF.pin;
  var FLAG_HOLDSHOOT = FLAG_OF.holdshoot;
  var FLAG_SPEEDHACK = FLAG_OF.speedhack;
  var _flags = 0;
  function setState(feature, value) {
    if (!(feature in state)) return;
    const enabled = !!value;
    state[feature] = enabled;
    if (enabled) _flags |= FLAG_OF[feature];
    else _flags &= ~FLAG_OF[feature];
  }
  function getFlags() {
    return _flags;
  }
  function setupSafe(label, fn) {
    try {
      fn();
      logInfo(label + " ready");
      return true;
    } catch (e) {
      const reason = e && e.message ? e.message : String(e);
      logError(
        label + " setup failed",
        {
          module: label,
          reason
        }
      );
      try {
        send(
          {
            type: "ERROR",
            code: 2,
            text: `setup ${label}: ${reason}`
          }
        );
      } catch (_) {
      }
      return false;
    }
  }

  // ../pc/src/agent/src/core/scanner.js
  var moduleBase = null;
  var _brawlerNameCache = /* @__PURE__ */ new Map();
  var _scanCount = 0;
  var _activeGidSet = /* @__PURE__ */ new Set();
  var _liveProjectiles = /* @__PURE__ */ new Map();
  var _destroyed = [];
  var _friendlyIdx = /* @__PURE__ */ new Set();
  var _projectileHooksInstalled = false;
  var MASSIVE_RADIUS_THRESHOLD = 380;
  var CASTING_RANGE_SCALE = 100;
  var SKILL_SLOT_MAX = 8;
  var PROJ_INDEX_MAX = 4;
  var _rangeByName = /* @__PURE__ */ new Map();
  var _harvestedChars = /* @__PURE__ */ new Set();
  var _charsByIndex = /* @__PURE__ */ new Map();
  var scanData = {
    ownCharacter: ptr(0),
    battleModeClient: ptr(0),
    myTeamId: 0,
    myPlayerIndex: -1,
    myX: 0,
    myY: 0,
    myRadius: 60,
    mySpeed: 720,
    hackSpeed: 0,
    myBrawlerId: 0,
    myBrawlerName: null,
    hasCarryable: false,
    throwsOverWalls: false,
    enemies: [],
    projectiles: [],
    destroyed: [],
    liveProjectiles: 0,
    lastUpdate: 0
  };
  function _validPtr(value) {
    return value && !value.isNull();
  }
  function ptrFromU32(lo, hi) {
    if (!lo && !hi) return ptr(0);
    return ptr("0x" + (hi >>> 0).toString(16).padStart(8, "0") + (lo >>> 0).toString(16).padStart(8, "0"));
  }
  function _readHeroIconName(data) {
    try {
      const namePtr = data.add(offsets.HeroData_namePtr).readPointer();
      if (!_validPtr(namePtr)) return null;
      const str = namePtr.readCString();
      if (str && str.startsWith("hero_icon_")) return str.substring(10).toUpperCase();
    } catch (_) {
    }
    return null;
  }
  function _readThrowsOverWalls(fns, own) {
    if (!fns.LogicCharacterClient_getWeaponSkill || !fns.LogicSkillData_getProjectileData) return false;
    try {
      const skill = fns.LogicCharacterClient_getWeaponSkill(own);
      if (!_validPtr(skill)) return false;
      const projectile = fns.LogicSkillData_getProjectileData(skill, 0);
      if (!_validPtr(projectile)) return false;
      return (projectile.add(offsets.Projectile_isIndirect).readU32() | 0) !== 0;
    } catch (_) {
      return false;
    }
  }
  function _readHasCarryable(fns, own, bm) {
    if (!fns.LogicCharacterClient_getLinkedCarryable) return false;
    try {
      return _validPtr(fns.LogicCharacterClient_getLinkedCarryable(own, bm));
    } catch (_) {
      return false;
    }
  }
  function _readProjectileName(data) {
    try {
      const fns = getFunctions();
      if (fns.LogicData_getName && data && !data.isNull()) {
        const named = readScString(fns.LogicData_getName(data), 128);
        if (named) return named;
      }
    } catch (_) {
    }
    try {
      const name = data.add(offsets.LogicProjectileClient_dataName).readPointer();
      return readScString(name, 128);
    } catch (_) {
      return null;
    }
  }
  function _classify(speed, radius) {
    const isSlow = speed <= 800;
    const isSpread = radius === 0 && speed >= 1400 && speed <= 1600;
    const isSniper = speed > 3500;
    let hitRadius;
    if (radius > 0) hitRadius = radius * 1.05;
    else if (isSlow) hitRadius = 520;
    else if (isSpread) hitRadius = 320;
    else if (isSniper) hitRadius = 350;
    else hitRadius = 240;
    return {
      isSlow,
      isSpread,
      isSniper,
      isMassive: hitRadius > MASSIVE_RADIUS_THRESHOLD || radius > MASSIVE_RADIUS_THRESHOLD,
      hitRadius,
      category: isSlow ? "slow" : isSpread ? "spread" : isSniper ? "sniper" : "normal"
    };
  }
  function _readOwnerIndex(obj) {
    try {
      return obj.add(offsets.LogicGameObjectClient_ownerIndex).readS32();
    } catch (_) {
      return -1;
    }
  }
  function _bodyOf(obj) {
    if (!_validPtr(obj)) return obj;
    try {
      const body = obj.add(offsets.LogicCharacterClient_body).readPointer();
      if (!_validPtr(body) || body.equals(obj)) return obj;
      const objVt = obj.readPointer();
      const bodyVt = body.readPointer();
      if (!_validPtr(objVt) || !_validPtr(bodyVt) || !bodyVt.equals(objVt)) return obj;
      return body;
    } catch (_) {
    }
    return obj;
  }
  function _ownerNameByIndex(ownerIndex) {
    if (ownerIndex < 0) return null;
    if (ownerIndex === scanData.myPlayerIndex && scanData.myBrawlerName) {
      return canonBrawlerName(scanData.myBrawlerName);
    }
    for (const enemy of scanData.enemies) {
      if (enemy.playerIndex === ownerIndex && enemy.brawlerName) {
        return canonBrawlerName(enemy.brawlerName);
      }
    }
    return null;
  }
  function _readAngle(projectile, rendering) {
    if (rendering !== 3) return null;
    try {
      const raw = projectile.add(offsets.Projectile_angle).readU32();
      return raw <= 360 ? raw : raw % 360;
    } catch (_) {
      return null;
    }
  }
  function _readTarget(fns, projectile) {
    let targetX = 0;
    let targetY = 0;
    try {
      if (fns.LogicProjectileClient_getTargetX) targetX = fns.LogicProjectileClient_getTargetX(projectile) | 0;
      if (fns.LogicProjectileClient_getTargetY) targetY = fns.LogicProjectileClient_getTargetY(projectile) | 0;
    } catch (_) {
    }
    return {
      targetX,
      targetY
    };
  }
  function _noteCastRange(name, units) {
    if (!name || !(units > 0) || units >= 7e4) return;
    const prev = _rangeByName.get(name) || 0;
    if (units > prev) _rangeByName.set(name, units);
  }
  function _harvestSkillData(fns, skillData) {
    if (!_validPtr(skillData) || !fns.LogicSkillData_getCastingRange || !fns.LogicSkillData_getProjectileData) return;
    try {
      const tiles = fns.LogicSkillData_getCastingRange(skillData) | 0;
      if (tiles <= 0) return;
      const units = tiles * CASTING_RANGE_SCALE;
      for (let i = 0; i < PROJ_INDEX_MAX; i++) {
        const proj = fns.LogicSkillData_getProjectileData(skillData, i);
        if (!_validPtr(proj)) continue;
        _noteCastRange(_readProjectileName(proj), units);
      }
    } catch (_) {
    }
  }
  function _harvestCharacter(character) {
    if (!_validPtr(character)) return false;
    const fns = getFunctions();
    let found = false;
    try {
      if (fns.LogicCharacterClient_getWeaponSkill) {
        const weapon = fns.LogicCharacterClient_getWeaponSkill(character);
        if (_validPtr(weapon)) {
          _harvestSkillData(fns, weapon);
          found = true;
        }
      }
    } catch (_) {
    }
    if (!fns.LogicCharacterClient_getSkillAt || !fns.LogicSkillClient_getData) return found;
    for (let slot = 0; slot < SKILL_SLOT_MAX; slot++) {
      try {
        const skill = fns.LogicCharacterClient_getSkillAt(character, slot);
        if (!_validPtr(skill)) continue;
        for (let hyper = 0; hyper < 2; hyper++) {
          const data = fns.LogicSkillClient_getData(skill, hyper);
          if (!_validPtr(data)) continue;
          _harvestSkillData(fns, data);
          found = true;
        }
      } catch (_) {
      }
    }
    return found;
  }
  function _rememberCharacter(index, character) {
    if (index < 0 || !_validPtr(character)) return;
    _charsByIndex.set(index, character);
    const key = character.toString();
    if (_harvestedChars.has(key)) return;
    if (_harvestCharacter(character)) _harvestedChars.add(key);
  }
  function _castRangeFor(name, ownerIndex) {
    const cached = name ? _rangeByName.get(name) || 0 : 0;
    if (cached > 0) return cached;
    if (ownerIndex >= 0) {
      const owner = _charsByIndex.get(ownerIndex);
      if (_validPtr(owner) && _harvestCharacter(owner) && name) {
        return _rangeByName.get(name) || 0;
      }
    }
    return 0;
  }
  function _ownerPos(ownerIndex) {
    if (ownerIndex < 0) return null;
    if (ownerIndex === scanData.myPlayerIndex) {
      return {
        x: scanData.myX,
        y: scanData.myY
      };
    }
    const character = _charsByIndex.get(ownerIndex);
    if (!_validPtr(character)) return null;
    try {
      const fns = getFunctions();
      return {
        x: fns.LogicGameObjectClient_getX(character) | 0,
        y: fns.LogicGameObjectClient_getY(character) | 0
      };
    } catch (_) {
      return null;
    }
  }
  function _captureProjectile(projectile, data, ownerTeamOverride) {
    if (!_validPtr(projectile)) return;
    const fns = getFunctions();
    try {
      if (!_validPtr(data) && fns.LogicProjectileClient_getData) data = fns.LogicProjectileClient_getData(projectile);
      if (!_validPtr(data)) data = fns.LogicGameObjectClient_getData(projectile);
      if (!_validPtr(data)) return;
      const gid = String(fns.LogicGameObjectClient_getGlobalID(projectile));
      const existing = _liveProjectiles.get(gid);
      if (existing) {
        existing.ptr = projectile;
        existing.data = data;
        existing.lastSeenAt = Date.now();
        if (ownerTeamOverride !== void 0) existing.ownerTeam = ownerTeamOverride | 0;
        return;
      }
      const x = fns.LogicGameObjectClient_getX(projectile) | 0;
      const y = fns.LogicGameObjectClient_getY(projectile) | 0;
      const speed = Math.max(1, fns.LogicProjectileData_getSpeed(data) | 0);
      const radius = Math.max(0, fns.LogicProjectileData_getRadius(data) | 0);
      const rendering = fns.LogicProjectileData_getRendering ? fns.LogicProjectileData_getRendering(data) | 0 : 0;
      const angle = _readAngle(projectile, rendering);
      const target = _readTarget(fns, projectile);
      const isThrower = data.add(offsets.Projectile_isIndirect).readU32() | 0;
      let isBeam = false;
      try {
        isBeam = !!(fns.LogicProjectileData_isBeam && fns.LogicProjectileData_isBeam(data));
      } catch (_) {
        isBeam = false;
      }
      let ownerTeam = ownerTeamOverride === void 0 ? 0 : ownerTeamOverride | 0;
      if (ownerTeamOverride === void 0) {
        try {
          ownerTeam = projectile.add(offsets.LogicProjectileClient_ownerTeam).readU32() | 0;
        } catch (_) {
        }
      }
      const ownerIndex = _readOwnerIndex(projectile);
      let spawnAreaRadius = 0;
      let spawnAreaActiveTime = 0;
      try {
        if (fns.LogicProjectileData_getSpawnAreaEffect) {
          const area = fns.LogicProjectileData_getSpawnAreaEffect(data);
          if (_validPtr(area)) {
            spawnAreaRadius = fns.AreaEffectData_getRadius ? fns.AreaEffectData_getRadius(area) | 0 : 0;
            spawnAreaActiveTime = fns.AreaEffectData_getActiveTimeMs ? fns.AreaEffectData_getActiveTimeMs(area) | 0 : 0;
          }
        }
      } catch (_) {
        spawnAreaRadius = 0;
        spawnAreaActiveTime = 0;
      }
      const classification = _classify(speed, radius);
      const name = _readProjectileName(data);
      const castRange = _castRangeFor(name, ownerIndex);
      _liveProjectiles.set(
        gid,
        {
          gid,
          ptr: projectile,
          data,
          ownerTeam,
          ownerIndex,
          ownerName: _ownerNameByIndex(ownerIndex),
          name,
          x,
          y,
          spawnX: x,
          spawnY: y,
          targetX: target.targetX,
          targetY: target.targetY,
          speed,
          radius,
          rendering,
          angle,
          isThrower,
          isBeam,
          spawnAreaRadius,
          spawnAreaActiveTime,
          castRange,
          hitRadius: classification.hitRadius,
          isSlow: classification.isSlow,
          isSpread: classification.isSpread,
          isSniper: classification.isSniper,
          isMassive: classification.isMassive,
          category: classification.category,
          spawnedAt: Date.now(),
          lastX: x,
          lastY: y,
          lastTs: Date.now(),
          lastSeenAt: Date.now(),
          hasVelocitySample: false,
          vx: angle === null ? 0 : Math.cos(angle * Math.PI / 180) * speed,
          vy: angle === null ? 0 : Math.sin(angle * Math.PI / 180) * speed
        }
      );
    } catch (_) {
    }
  }
  function _removeProjectile(projectile) {
    try {
      const gid = String(getFunctions().LogicGameObjectClient_getGlobalID(projectile));
      const record = _liveProjectiles.get(gid);
      if (record && _destroyed.length < 16) {
        _destroyed.push(
          {
            name: record.name,
            angle: record.angle,
            spawnX: record.spawnX,
            spawnY: record.spawnY,
            x: record.lastX,
            y: record.lastY
          }
        );
      }
      _liveProjectiles.delete(gid);
    } catch (_) {
    }
  }
  function _installProjectileHooks(base2) {
    if (_projectileHooksInstalled) return;
    _projectileHooksInstalled = true;
    try {
      Interceptor.attach(
        base2.add(offsets.LogicProjectileClient_ctor),
        {
          onEnter(args) {
            this.projectile = args[0];
            this.data = args[1];
          },
          onLeave() {
            _captureProjectile(this.projectile, this.data);
          }
        }
      );
    } catch (_) {
    }
    try {
      Interceptor.attach(
        base2.add(offsets.LogicProjectileClient_destruct),
        {
          onEnter(args) {
            _removeProjectile(args[0]);
          }
        }
      );
    } catch (_) {
    }
  }
  function _updateLiveProjectiles(now) {
    const fns = getFunctions();
    const output = [];
    for (const [gid, projectile] of _liveProjectiles) {
      try {
        if (projectile.ptr.isNull()) {
          _liveProjectiles.delete(gid);
          continue;
        }
        if (now - (projectile.lastSeenAt || 0) > 800) {
          _liveProjectiles.delete(gid);
          continue;
        }
        const x = fns.LogicGameObjectClient_getX(projectile.ptr) | 0;
        const y = fns.LogicGameObjectClient_getY(projectile.ptr) | 0;
        if (projectile.targetX === 0 && projectile.targetY === 0) {
          const target = _readTarget(fns, projectile.ptr);
          projectile.targetX = target.targetX;
          projectile.targetY = target.targetY;
        }
        const dt = (now - projectile.lastTs) / 1e3;
        const dx = x - projectile.lastX;
        const dy = y - projectile.lastY;
        if (dt > 2e-3 && dt < 0.3 && dx * dx + dy * dy >= 16) {
          const observedVx = dx / dt;
          const observedVy = dy / dt;
          const alpha = projectile.hasVelocitySample ? 0.4 : 1;
          projectile.vx = projectile.vx * (1 - alpha) + observedVx * alpha;
          projectile.vy = projectile.vy * (1 - alpha) + observedVy * alpha;
          projectile.hasVelocitySample = true;
        }
        if (!projectile.hasVelocitySample && projectile.targetX !== 0 && projectile.targetY !== 0 && projectile.vx === 0 && projectile.vy === 0) {
          const tx = projectile.targetX - x;
          const ty = projectile.targetY - y;
          const length = Math.hypot(tx, ty);
          if (length > 0) {
            projectile.vx = tx / length * projectile.speed;
            projectile.vy = ty / length * projectile.speed;
          }
        }
        projectile.x = x;
        projectile.y = y;
        projectile.lastX = x;
        projectile.lastY = y;
        projectile.lastTs = now;
        projectile.ownerName = _ownerNameByIndex(projectile.ownerIndex);
        const ownerPos = _ownerPos(projectile.ownerIndex);
        if (ownerPos) {
          projectile.ownerX = ownerPos.x;
          projectile.ownerY = ownerPos.y;
        }
        if (!(projectile.castRange > 0)) {
          projectile.castRange = _castRangeFor(projectile.name, projectile.ownerIndex);
        }
        if (projectile.ownerIndex >= 0 && _friendlyIdx.has(projectile.ownerIndex)) continue;
        if (projectile.ownerTeam === scanData.myTeamId) continue;
        output.push(
          {
            gid,
            ptr: projectile.ptr,
            name: projectile.name,
            ownerTeam: projectile.ownerTeam,
            ownerIndex: projectile.ownerIndex,
            ownerName: projectile.ownerName,
            ownerX: projectile.ownerX,
            ownerY: projectile.ownerY,
            x,
            y,
            spawnX: projectile.spawnX,
            spawnY: projectile.spawnY,
            targetX: projectile.targetX,
            targetY: projectile.targetY,
            speed: projectile.speed,
            radius: projectile.radius,
            hitRadius: projectile.hitRadius,
            rendering: projectile.rendering,
            angle: projectile.angle,
            isThrower: projectile.isThrower,
            isBeam: !!projectile.isBeam,
            spawnAreaRadius: projectile.spawnAreaRadius,
            spawnAreaActiveTime: projectile.spawnAreaActiveTime,
            castRange: projectile.castRange || 0,
            isSlow: projectile.isSlow,
            isSpread: projectile.isSpread,
            isSniper: projectile.isSniper,
            isMassive: projectile.isMassive,
            category: projectile.category,
            spawnedAt: projectile.spawnedAt,
            vx: projectile.vx,
            vy: projectile.vy
          }
        );
      } catch (_) {
        _liveProjectiles.delete(gid);
      }
    }
    return output;
  }
  function updateScanner(bm, now) {
    if (!moduleBase) return;
    if (now === void 0) now = Date.now();
    const functions = getFunctions();
    try {
      const own = functions.LogicBattleModeClient_getOwnCharacter(bm);
      if (!_validPtr(own)) {
        scanData.ownCharacter = null;
        scanData.battleModeClient = null;
        scanData.hasCarryable = false;
        scanData.throwsOverWalls = false;
        scanData.lastUpdate = 0;
        return;
      }
      scanData.ownCharacter = own;
      scanData.battleModeClient = bm;
      scanData.myTeamId = functions.LogicBattleModeClient_getOwnPlayerTeam(bm);
      scanData.myPlayerIndex = functions.LogicBattleModeClient_getOwnPlayerIndex ? functions.LogicBattleModeClient_getOwnPlayerIndex(bm) | 0 : _readOwnerIndex(own);
      _friendlyIdx.clear();
      _friendlyIdx.add(scanData.myPlayerIndex);
      _charsByIndex.clear();
      _rememberCharacter(scanData.myPlayerIndex, own);
      try {
        const self = _bodyOf(own);
        scanData.myX = functions.LogicGameObjectClient_getX(self) | 0;
        scanData.myY = functions.LogicGameObjectClient_getY(self) | 0;
      } catch (_) {
        scanData.myX = functions.LogicGameObjectClient_getX(own) | 0;
        scanData.myY = functions.LogicGameObjectClient_getY(own) | 0;
      }
      scanData.hasCarryable = _readHasCarryable(functions, own, bm);
      scanData.throwsOverWalls = _readThrowsOverWalls(functions, own);
      scanData.mySpeed = 720;
      const ownData = functions.LogicGameObjectClient_getData(own);
      if (_validPtr(ownData)) {
        scanData.myRadius = functions.LogicCharacterData_getCollisionRadius(ownData) || 60;
        try {
          scanData.myBrawlerId = ownData.add(offsets.CharData_brawlerId).readU8() | 0;
        } catch (_) {
        }
        try {
          const baseSpeed = functions.LogicCharacterData_getSpeed ? functions.LogicCharacterData_getSpeed(ownData) | 0 : 0;
          const buff = own.add(offsets.LogicCharacterClientOwn_speedBuff).readS32() | 0;
          const speed = baseSpeed + buff;
          if (speed >= 300 && speed <= 3e3) scanData.mySpeed = speed;
        } catch (_) {
        }
        const nameRead = _readHeroIconName(ownData);
        if (nameRead) scanData.myBrawlerName = nameRead;
      }
      const enemies = [];
      const vtableProj = moduleBase.add(offsets.VTABLE_PROJECTILE_DATA);
      const objMgr = bm.add(offsets.BattleMode_objectManagerPtr).readPointer();
      if (_validPtr(objMgr)) {
        const objects = objMgr.add(offsets.ObjectManager_objectsArray).readPointer();
        const count = objMgr.add(offsets.ObjectManager_count).readU32();
        if (_validPtr(objects) && count > 0 && count <= 1200) {
          const stride = offsets.ObjectManager_ptrStride;
          let batchView = null;
          try {
            const buf = objects.readByteArray(count * stride);
            if (buf) batchView = new DataView(buf);
          } catch (_) {
          }
          for (let i = 0; i < count; i++) {
            try {
              let obj;
              if (batchView) {
                const off2 = i * stride;
                const lo = batchView.getUint32(off2, true);
                const hi = batchView.getUint32(off2 + 4, true);
                if (lo === 0 && hi === 0) continue;
                obj = ptrFromU32(lo, hi);
              } else {
                obj = objects.add(i * stride).readPointer();
              }
              if (!_validPtr(obj)) continue;
              const data = functions.LogicGameObjectClient_getData(obj);
              if (!_validPtr(data)) continue;
              const team = obj.add(offsets.GameObj_team).readU32();
              if (data.readPointer().equals(vtableProj)) {
                if (state.autododge && team !== scanData.myTeamId) _captureProjectile(obj, data, team);
                continue;
              }
              if (team === scanData.myTeamId) {
                const idx = _readOwnerIndex(obj);
                if (idx >= 0) _friendlyIdx.add(idx);
                continue;
              }
              if (obj.add(offsets.GameObj_deadFlag).readU32() !== 0) continue;
              const gid = String(functions.LogicGameObjectClient_getGlobalID(obj));
              let brawlerName = _brawlerNameCache.get(gid);
              if (brawlerName === void 0) {
                brawlerName = _readHeroIconName(data);
                _brawlerNameCache.set(gid, brawlerName);
              }
              let radius = 0;
              try {
                radius = functions.LogicCharacterData_getCollisionRadius ? functions.LogicCharacterData_getCollisionRadius(data) | 0 : 0;
              } catch (_) {
              }
              if (!brawlerName && radius <= 0) continue;
              const kind = brawlerName ? "player" : "spawnable";
              let moveSpeed = 0;
              try {
                moveSpeed = functions.LogicCharacterData_getSpeed ? functions.LogicCharacterData_getSpeed(data) | 0 : 0;
              } catch (_) {
              }
              const playerIndex = _readOwnerIndex(obj);
              if (brawlerName) _rememberCharacter(playerIndex, obj);
              let brawlerId = 0;
              if (brawlerName) {
                try {
                  brawlerId = data.add(offsets.CharData_brawlerId).readU8() | 0;
                } catch (_) {
                }
              }
              const body = _bodyOf(obj);
              enemies.push(
                {
                  gid,
                  ptr: obj,
                  x: functions.LogicGameObjectClient_getX(body) | 0,
                  y: functions.LogicGameObjectClient_getY(body) | 0,
                  brawlerId,
                  brawlerName,
                  teamId: team,
                  playerIndex,
                  moveSpeed,
                  radius,
                  kind
                }
              );
            } catch (_) {
            }
          }
        }
      }
      _scanCount++;
      if ((_scanCount & 63) === 0) {
        _activeGidSet.clear();
        for (const enemy of enemies) _activeGidSet.add(enemy.gid);
        for (const gid of _brawlerNameCache.keys()) {
          if (!_activeGidSet.has(gid)) _brawlerNameCache.delete(gid);
        }
      }
      scanData.enemies = enemies;
      scanData.destroyed = _destroyed.splice(0);
      if (state.autododge) {
        scanData.projectiles = _updateLiveProjectiles(now);
      } else {
        if (_liveProjectiles.size) _liveProjectiles.clear();
        scanData.projectiles = [];
      }
      scanData.liveProjectiles = _liveProjectiles.size;
      scanData.lastUpdate = now;
    } catch (_) {
    }
  }
  function resetScannerCache() {
    _brawlerNameCache.clear();
    _liveProjectiles.clear();
    _friendlyIdx.clear();
    _charsByIndex.clear();
    _harvestedChars.clear();
    _destroyed.length = 0;
    scanData.projectiles = [];
    scanData.destroyed = [];
    scanData.liveProjectiles = 0;
    scanData.hackSpeed = 0;
  }
  function initScanner(base2) {
    moduleBase = base2;
  }
  function enableProjectileTracking() {
    if (moduleBase) _installProjectileHooks(moduleBase);
  }

  // ../pc/src/agent/src/utils/wallCache.js
  var MAX_MAP_TILES = 120;
  var MAX_TOTAL_TILES = MAX_MAP_TILES * MAX_MAP_TILES;
  var RETRY_MS = 2e3;
  var TILE_SIZE = 300;
  var BLOCKS_MOVEMENT = 128;
  var BLOCKS_PROJECTILES = 64;
  var TRACE_STEP = 40;
  var TRACE_BACKOFF = 75;
  var walls = null;
  var wallsWidth = 0;
  var wallsHeight = 0;
  var needsRebuild = true;
  var lastFailedTs = 0;
  var tileWatchInstalled = false;
  function _validPtr2(value) {
    return value && !value.isNull();
  }
  function ptrFromU322(lo, hi) {
    if (!lo && !hi) return ptr(0);
    return ptr("0x" + (hi >>> 0).toString(16).padStart(8, "0") + (lo >>> 0).toString(16).padStart(8, "0"));
  }
  function _rebuildFrom(tileMap2) {
    if (!_validPtr2(tileMap2)) return false;
    try {
      const width = tileMap2.add(offsets.TileMap_Width).readS32();
      const height = tileMap2.add(offsets.TileMap_Height).readS32();
      if (width <= 0 || width > MAX_MAP_TILES || height <= 0 || height > MAX_MAP_TILES) return false;
      const total = width * height;
      if (total > MAX_TOTAL_TILES) return false;
      const tiles = tileMap2.add(offsets.TileMap_TilesArray).readPointer();
      if (!_validPtr2(tiles)) return false;
      const pointerSize = Process.pointerSize;
      const raw = tiles.readByteArray(total * pointerSize);
      if (!raw) return false;
      const view = new DataView(raw);
      const grid = new Uint8Array(total);
      const flagsByType = /* @__PURE__ */ new Map();
      for (let i = 0; i < total; i++) {
        const lo = view.getUint32(i * pointerSize, true);
        const hi = view.getUint32(i * pointerSize + 4, true);
        if (lo === 0 && hi === 0) continue;
        const tile = ptrFromU322(lo, hi);
        let tileType;
        try {
          tileType = tile.readPointer();
        } catch (_) {
          continue;
        }
        if (!_validPtr2(tileType)) continue;
        const key = tileType.toString();
        let flags = flagsByType.get(key);
        if (flags === void 0) {
          flags = 0;
          try {
            const packed = tileType.add(offsets.TileTypeData_BlocksMovement).readU16();
            if (packed & 255) flags |= BLOCKS_MOVEMENT;
            if (packed >> 8) flags |= BLOCKS_PROJECTILES;
          } catch (_) {
          }
          flagsByType.set(key, flags);
        }
        grid[i] = flags;
      }
      walls = grid;
      wallsWidth = width;
      wallsHeight = height;
      needsRebuild = false;
      return true;
    } catch (_) {
      return false;
    }
  }
  function notifyBattleModeChanged(battleMode) {
    walls = null;
    wallsWidth = 0;
    wallsHeight = 0;
    needsRebuild = true;
    lastFailedTs = 0;
    maybeRefreshWallCache(battleMode, Date.now());
  }
  function maybeRefreshWallCache(battleMode, now) {
    if (!needsRebuild || !_validPtr2(battleMode)) return;
    if (now === void 0) now = Date.now();
    if (now - lastFailedTs < RETRY_MS) return;
    try {
      const tileMap2 = getFunctions().LogicBattleModeClient_getTileMap(battleMode);
      if (_rebuildFrom(tileMap2)) return;
    } catch (_) {
    }
    lastFailedTs = now;
  }
  function watchTileChanges(base2) {
    if (tileWatchInstalled) return;
    try {
      Interceptor.attach(
        base2.add(offsets.LogicTile__setData),
        {
          onEnter() {
            needsRebuild = true;
          }
        }
      );
      tileWatchInstalled = true;
    } catch (_) {
    }
  }
  function getWallCacheW() {
    return wallsWidth;
  }
  function getWallCacheH() {
    return wallsHeight;
  }
  function losCheck(wx0, wy0, wx1, wy1, checkBit) {
    const grid = walls;
    if (!grid) return true;
    const width = wallsWidth;
    const height = wallsHeight;
    let cx = wx0 / TILE_SIZE | 0;
    let cy = wy0 / TILE_SIZE | 0;
    const tx = wx1 / TILE_SIZE | 0;
    const ty = wy1 / TILE_SIZE | 0;
    if (cx === tx && cy === ty) return true;
    const dx = Math.abs(tx - cx);
    const dy = -Math.abs(ty - cy);
    const sx = cx < tx ? 1 : -1;
    const sy = cy < ty ? 1 : -1;
    let err = dx + dy;
    const maxSteps = dx - dy + 2;
    for (let n = 0; n < maxSteps; n++) {
      const e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        cx += sx;
      }
      if (e2 <= dx) {
        err += dx;
        cy += sy;
      }
      if (cx === tx && cy === ty) return true;
      if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
      if (grid[cy * width + cx] & checkBit) return false;
    }
    return true;
  }
  function traceWallHit(wx, wy, dirX, dirY, maxDist, checkBit) {
    const grid = walls;
    if (!grid || maxDist <= 0) return maxDist;
    const width = wallsWidth;
    const height = wallsHeight;
    if (width <= 0 || height <= 0) return maxDist;
    let dist = 0;
    while (dist < maxDist) {
      dist += TRACE_STEP;
      if (dist > maxDist) dist = maxDist;
      const tx = (wx + dirX * dist) / TILE_SIZE | 0;
      const ty = (wy + dirY * dist) / TILE_SIZE | 0;
      if (tx < 0 || tx >= width || ty < 0 || ty >= height) return Math.max(0, dist - TRACE_BACKOFF);
      if (grid[ty * width + tx] & checkBit) return Math.max(0, dist - TRACE_BACKOFF);
    }
    return maxDist;
  }
  function isBlockedAt(wx, wy, checkBit) {
    const grid = walls;
    if (!grid) return false;
    const width = wallsWidth;
    const height = wallsHeight;
    if (width <= 0 || height <= 0) return false;
    const tx = wx / TILE_SIZE | 0;
    const ty = wy / TILE_SIZE | 0;
    if (tx < 0 || tx >= width || ty < 0 || ty >= height) return false;
    return !!(grid[ty * width + tx] & checkBit);
  }
  function isBlockedWide(wx, wy, radius, checkBit) {
    if (isBlockedAt(wx, wy, checkBit)) return true;
    const r = radius > 0 ? radius : 0;
    if (r <= 0) return false;
    return isBlockedAt(wx + r, wy, checkBit) || isBlockedAt(wx - r, wy, checkBit) || isBlockedAt(wx, wy + r, checkBit) || isBlockedAt(wx, wy - r, checkBit);
  }

  // ../pc/src/agent/src/helpers/aim_lead.js
  var LEAD_DEFAULT = 65;
  var LEAD = Object.freeze(
    {
      "8BIT": 70,
      AMBER: 83,
      ANGELO: 60,
      BEA: 56,
      BELLE: 56,
      BO: 74,
      BONNIE: 59,
      BROCK: 70,
      BYRON: 59,
      CARL: 76,
      CLANCY: 72,
      COLETTE: 57,
      COLT: 62,
      EVE: 75,
      FINX: 68,
      GALE: 68,
      GRAY: 56,
      GRIFF: 68,
      GUS: 68,
      JAE: 60,
      JANET: 65,
      JESS: 72,
      LILY: 68,
      LOU: 60,
      MAISIE: 78,
      MANDY: 65,
      MAX: 68,
      MEG: 54,
      MRP: 65,
      NANI: 98,
      OTIS: 60,
      MJ: 69,
      PEARL: 69,
      PENNY: 61,
      PIPER: 56,
      RICK: 68,
      RT: 55,
      RUFFS: 66,
      SPIKE: 65,
      SQUEAK: 74,
      STU: 60,
      SURGE: 72
    }
  );
  function leadOf(name) {
    const id = canonBrawlerName(name);
    if (id && LEAD[id] > 0) return LEAD[id];
    return LEAD_DEFAULT;
  }

  // ../pc/src/agent/src/features/aimbot.js
  var TUNE = {
    WATCH_MS: 80,
    STRIDE: 40,
    FLIGHT_CAP: 1.15,
    SPEED_PAD: 1.35,
    LOS_TTL_MS: 100,
    LOS_PURGE_MS: 500,
    FALLBACK_SPEED: 4e3,
    FALLBACK_RADIUS: 300,
    CACHE_MS: 250
  };
  var SKIP_SKILLS = /* @__PURE__ */ new Set([
    "ShamanUlti",
    "MechanicUlti",
    "ClusterBombDudeUlti",
    "ArcadeUlti",
    "ArtilleryDudeUlti",
    "SoulCollectorUlti",
    "MinigunDudeUlti",
    "KnightUlti",
    "DuplicatorUlti",
    "TwinsUlti",
    "SpawnerDudeUlti",
    "ConductorUlti",
    "MeepleUlti",
    "FleaUlti",
    "ReviverUlti",
    "VoodooUlti",
    "ShadowdemonUlti",
    "RollerUlti",
    "SniperUlti",
    "EnragerUlti",
    "PowerLevelerUlti",
    "DoorManUlti",
    "ConductorUltiSpawn"
  ]);
  var _live = /* @__PURE__ */ new Map();
  var bestPtr = null;
  var bestGid = null;
  var _scrubTs = 0;
  var _losMemo = /* @__PURE__ */ new Map();
  var _cacheTs = 0;
  var _hyper = -1;
  var _slots = {
    attack: null,
    super: null,
    gadget: null
  };
  var _shots = {
    attack: null,
    super: null,
    gadget: null
  };
  var _pendingLog = null;
  var _opts = {
    onManualAim: true,
    onAutoshoot: true,
    useSuper: true,
    allowGadget: true,
    allowPlayers: true,
    allowSpawnables: true
  };
  var _superSet = /* @__PURE__ */ new Set();
  function _superOk(name) {
    if (_superSet.size === 0) return true;
    return !!name && _superSet.has(name);
  }
  function _dataName(data) {
    const fns = getFunctions();
    if (!fns.LogicData_getName || !data) return null;
    try {
      if (data.isNull()) return null;
      return readScString(fns.LogicData_getName(data), 64);
    } catch (_) {
      return null;
    }
  }
  function _selfName() {
    return scanData.myBrawlerName;
  }
  function _same(a, b) {
    if (!a || !b) return false;
    try {
      return !a.isNull() && !b.isNull() && a.equals(b);
    } catch (_) {
      return false;
    }
  }
  function _slotPtr(own, slot) {
    try {
      const fns = getFunctions();
      if (!fns.LogicCharacterClient_getSkillAt || !own || own.isNull()) return null;
      const skill = fns.LogicCharacterClient_getSkillAt(own, slot);
      return skill && !skill.isNull() ? skill : null;
    } catch (_) {
      return null;
    }
  }
  function _emptyShot() {
    return {
      skip: false,
      kind: "attack",
      reach: 0,
      vel: TUNE.FALLBACK_SPEED,
      rad: TUNE.FALLBACK_RADIUS,
      loft: !!scanData.throwsOverWalls,
      live: false,
      name: null
    };
  }
  function _shotOf(skill) {
    const empty = _emptyShot();
    if (!skill || skill.isNull()) return empty;
    try {
      const fns = getFunctions();
      const name = _dataName(skill);
      if (name && SKIP_SKILLS.has(name)) return {
        skip: true,
        kind: "attack",
        reach: 0,
        vel: 0,
        rad: TUNE.FALLBACK_RADIUS,
        loft: false,
        live: false,
        name
      };
      let reach = 0;
      if (fns.LogicSkillData_getCastingRange) {
        const tiles = fns.LogicSkillData_getCastingRange(skill) | 0;
        if (tiles > 0) reach = tiles * 100;
      }
      let vel = 0;
      let rad = TUNE.FALLBACK_RADIUS;
      let loft = !!scanData.throwsOverWalls;
      if (fns.LogicSkillData_getProjectileData) {
        const projectile = fns.LogicSkillData_getProjectileData(skill, 0);
        if (projectile && !projectile.isNull()) {
          vel = fns.LogicProjectileData_getSpeed(projectile) | 0;
          if (fns.LogicProjectileData_getRadius) rad = fns.LogicProjectileData_getRadius(projectile) | 0;
          if (rad <= 0) rad = TUNE.FALLBACK_RADIUS;
          try {
            loft = (projectile.add(offsets.Projectile_isIndirect).readU32() | 0) !== 0;
          } catch (_) {
          }
        }
      }
      return {
        skip: false,
        kind: "attack",
        reach,
        vel: vel > 0 ? vel : TUNE.FALLBACK_SPEED,
        rad,
        loft,
        live: vel > 0,
        name
      };
    } catch (_) {
      return empty;
    }
  }
  function _readHyper(own) {
    try {
      if (!own || own.isNull()) return 0;
      return own.add(offsets.LogicCharacterClient_hyperActive).readU8() !== 0 ? 1 : 0;
    } catch (_) {
      return 0;
    }
  }
  function _shotFromClient(client, hyper) {
    try {
      const fns = getFunctions();
      if (!client || client.isNull() || !fns.LogicSkillClient_getData) return _emptyShot();
      return _shotOf(fns.LogicSkillClient_getData(client, hyper));
    } catch (_) {
      return _emptyShot();
    }
  }
  function _copyShot(shot, kind) {
    const src = shot || _emptyShot();
    return {
      skip: !!src.skip,
      kind: kind || src.kind || "attack",
      reach: src.reach || 0,
      vel: src.vel || TUNE.FALLBACK_SPEED,
      rad: src.rad || TUNE.FALLBACK_RADIUS,
      loft: !!src.loft,
      live: !!src.live,
      name: src.name || null
    };
  }
  function _cacheShots(now) {
    const own = scanData.ownCharacter;
    const hyper = _readHyper(own);
    if (now - _cacheTs < TUNE.CACHE_MS && hyper === _hyper && _shots.attack) return;
    _cacheTs = now;
    _hyper = hyper;
    if (!own || own.isNull()) return;
    try {
      const fns = getFunctions();
      _slots.attack = _slotPtr(own, 0);
      _slots.super = _slotPtr(own, 1);
      _slots.gadget = _slotPtr(own, 2);
      if (!_slots.gadget) _slots.gadget = _slotPtr(own, 5);
      const weapon = fns.LogicCharacterClient_getWeaponSkill ? fns.LogicCharacterClient_getWeaponSkill(own) : null;
      _shots.attack = weapon && !weapon.isNull() ? _shotOf(weapon) : _shotFromClient(_slots.attack, hyper);
      _shots.super = _shotFromClient(_slots.super, hyper);
      _shots.gadget = _shotFromClient(_slots.gadget, hyper);
      if (_shots.attack) _shots.attack.kind = "attack";
      if (_shots.super) _shots.super.kind = "super";
      if (_shots.gadget) _shots.gadget.kind = "gadget";
    } catch (_) {
    }
  }
  function _shotForClient(client) {
    if (client && !client.isNull()) {
      if (_same(client, _slots.super)) return _copyShot(_shots.super, "super");
      if (_same(client, _slots.gadget)) return _copyShot(_shots.gadget, "gadget");
    }
    return _copyShot(_shots.attack, "attack");
  }
  function _bearing(ax, ay, bx, by) {
    return (Math.atan2(by - ay, bx - ax) * 180 / Math.PI + 360) % 360;
  }
  function _sight(x0, y0, x1, y1) {
    const tx0 = x0 / TILE_SIZE | 0, ty0 = y0 / TILE_SIZE | 0, tx1 = x1 / TILE_SIZE | 0, ty1 = y1 / TILE_SIZE | 0;
    const key = (tx0 & 127) << 21 | (ty0 & 127) << 14 | (tx1 & 127) << 7 | ty1 & 127 | 0;
    const now = Date.now();
    const hit = _losMemo.get(key);
    if (hit !== void 0 && now - hit.ts < TUNE.LOS_TTL_MS) return hit.v;
    const v = losCheck(x0, y0, x1, y1, BLOCKS_PROJECTILES);
    _losMemo.set(
      key,
      {
        v,
        ts: now
      }
    );
    return v;
  }
  function _motion(row, x, y, now) {
    if (!row.markTs) {
      row.markTs = now;
      row.markX = x;
      row.markY = y;
      row.spd = 0;
      return;
    }
    const dt = now - row.markTs;
    if (dt < TUNE.WATCH_MS) return;
    const dx = x - row.markX;
    const dy = y - row.markY;
    const gone = Math.hypot(dx, dy);
    if (gone >= TUNE.STRIDE) {
      let spd = gone / (dt / 1e3);
      if (!(row.gait > 0)) spd = 0;
      else {
        const cap = row.gait * TUNE.SPEED_PAD;
        if (spd > cap) spd = cap;
      }
      row.spd = spd;
      if (spd > 0) row.yaw = _bearing(row.markX, row.markY, x, y);
    } else {
      row.spd = 0;
    }
    row.markTs = now;
    row.markX = x;
    row.markY = y;
  }
  function _point(ox, oy, row, shot, lead) {
    if (!row) return null;
    let x = row.x;
    let y = row.y;
    if (shot && shot.live && shot.vel > 0 && lead > 0 && row.spd > 0 && row.gait > 0) {
      const vel = shot.vel;
      const scale = lead / 100;
      let flight = Math.hypot(row.x - ox, row.y - oy) / vel;
      const pocket = (row.rad || 0) + (shot.rad || 0);
      if (row.spd * flight > pocket) {
        const rad = row.yaw * Math.PI / 180;
        const ux = Math.cos(rad);
        const uy = Math.sin(rad);
        for (let i = 0; i < 3; i++) {
          flight = Math.hypot(x - ox, y - oy) / vel;
          if (flight > TUNE.FLIGHT_CAP) flight = TUNE.FLIGHT_CAP;
          x = row.x + ux * row.spd * flight * scale;
          y = row.y + uy * row.spd * flight * scale;
        }
        if (!isFinite(x) || !isFinite(y)) {
          x = row.x;
          y = row.y;
        }
      }
    }
    const reach = shot && shot.reach > 0 ? shot.reach : 0;
    if (reach > 0) {
      const dx = x - ox;
      const dy = y - oy;
      const dist = Math.hypot(dx, dy);
      const max = reach + (row.rad || 0);
      if (dist > max && dist > 1) {
        x = ox + dx * max / dist;
        y = oy + dy * max / dist;
      }
    }
    return {
      x: Math.round(x),
      y: Math.round(y)
    };
  }
  function _accept(tag) {
    if (tag === "prop") return _opts.allowSpawnables;
    return _opts.allowPlayers;
  }
  function _nearest(ox, oy, shot) {
    let foe = null;
    let foeCost = 1 / 0;
    let prop = null;
    let propCost = 1 / 0;
    const loft = !!(shot && (shot.loft || scanData.throwsOverWalls));
    const reach = shot && shot.reach > 0 ? shot.reach : 0;
    for (const row of _live.values()) {
      if (!_accept(row.tag)) continue;
      const dist = Math.hypot(row.x - ox, row.y - oy);
      if (reach > 0 && dist > reach + (row.rad || 0)) continue;
      if (!loft && !_sight(ox, oy, row.x, row.y)) continue;
      if (row.tag === "prop") {
        if (dist < propCost) {
          propCost = dist;
          prop = row;
        }
      } else if (dist < foeCost) {
        foeCost = dist;
        foe = row;
      }
    }
    return foe || prop;
  }
  function _closest(ox, oy) {
    let foe = null;
    let foeCost = 1 / 0;
    let prop = null;
    let propCost = 1 / 0;
    for (const row of _live.values()) {
      if (!_accept(row.tag)) continue;
      const dist = Math.hypot(row.x - ox, row.y - oy);
      if (row.tag === "prop") {
        if (dist < propCost) {
          propCost = dist;
          prop = row;
        }
      } else if (dist < foeCost) {
        foeCost = dist;
        foe = row;
      }
    }
    return foe || prop;
  }
  function _aim(ox, oy, shot) {
    const row = _nearest(ox, oy, shot);
    if (!row) return null;
    const at = _point(ox, oy, row, shot, leadOf(_selfName()));
    if (!at) return null;
    return {
      id: row.gid,
      ptr: row.ptr,
      x: at.x,
      y: at.y
    };
  }
  function _putAim(args, aim) {
    args[1] = ptr(aim.x);
    args[2] = ptr(aim.y);
  }
  function _kindOk(kind) {
    if (kind === "super") return _opts.useSuper && _superOk(scanData.myBrawlerName);
    if (kind === "gadget") return _opts.allowGadget;
    return true;
  }
  function resetAimbot() {
    _live.clear();
    bestPtr = null;
    bestGid = null;
    _scrubTs = 0;
    _cacheTs = 0;
    _hyper = -1;
    _slots.attack = null;
    _slots.super = null;
    _slots.gadget = null;
    _shots.attack = null;
    _shots.super = null;
    _shots.gadget = null;
    _pendingLog = null;
    _losMemo.clear();
  }
  function computeAimForTarget(targetId, ownX, ownY, projSpeedOverride) {
    const row = _live.get(targetId);
    if (!row) {
      logEvery(
        30,
        "aimbot no target in map",
        {
          targetId,
          mapSize: _live.size
        }
      );
      return null;
    }
    const shot = _copyShot(_shots.attack, "attack");
    if (projSpeedOverride > 0) {
      shot.vel = projSpeedOverride;
      shot.live = true;
    }
    return _point(ownX, ownY, row, shot, leadOf(_selfName()));
  }
  function setupAimbot(base2) {
    Interceptor.attach(
      base2.add(offsets.BattleScreen_activateSkill),
      {
        onEnter: function(args) {
          if (!state.aimbot) return;
          if (scanData.hasCarryable) return;
          if (scanData.lastUpdate === 0) return;
          const shot = _shotForClient(args[4]);
          if (shot.skip) return;
          if (!_kindOk(shot.kind)) return;
          let targetId = 0;
          try {
            targetId = args[6].toInt32();
          } catch (_) {
          }
          const manual = _opts.onManualAim && targetId === 0;
          const auto = _opts.onAutoshoot && targetId !== 0;
          if (shot.kind === "attack" && !manual && !auto) return;
          if (shot.kind === "super" && !_opts.onManualAim && !_opts.onAutoshoot) return;
          const ox = scanData.myX;
          const oy = scanData.myY;
          const aim = _aim(ox, oy, shot);
          if (!aim) return;
          bestPtr = aim.ptr || null;
          bestGid = aim.id || null;
          _putAim(args, aim);
          _pendingLog = {
            id: aim.id,
            x: aim.x,
            y: aim.y,
            myX: ox | 0,
            myY: oy | 0,
            dist: Math.hypot(aim.x - ox, aim.y - oy) | 0,
            kind: shot.kind,
            vel: shot.vel | 0,
            reach: shot.reach | 0,
            live: !!shot.live,
            lead: leadOf(_selfName())
          };
        }
      }
    );
    Interceptor.attach(
      base2.add(offsets.BattleScreen_getClosestTargetForAutoshoot),
      {
        onLeave(retval) {
          const aimActive = state.aimbot && _opts.onAutoshoot;
          const killActive = state.killaura;
          if (!aimActive && !killActive) return;
          if (scanData.hasCarryable) return;
          if (scanData.lastUpdate === 0) return;
          if (!bestGid) return;
          const row = _live.get(bestGid);
          if (!row || !row.ptr) return;
          try {
            if (row.ptr.isNull()) return;
            bestPtr = row.ptr;
            retval.replace(bestPtr);
          } catch (_) {
          }
        }
      }
    );
  }
  function updateAimbot(now) {
    if (!state.aimbot && !state.killaura || scanData.lastUpdate === 0) return;
    if (now === void 0) now = Date.now();
    const seen = /* @__PURE__ */ new Set();
    const enemies = scanData.enemies || [];
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      if (enemy.teamId === scanData.myTeamId) continue;
      const gid = enemy.gid;
      if (!gid) continue;
      seen.add(gid);
      let row = _live.get(gid);
      if (!row) {
        row = {
          gid,
          ptr: enemy.ptr || null,
          x: enemy.x,
          y: enemy.y,
          rad: enemy.radius || 0,
          tag: enemy.kind === "spawnable" ? "prop" : "foe",
          yaw: 0,
          spd: 0,
          gait: enemy.moveSpeed || 0,
          markTs: 0,
          markX: enemy.x,
          markY: enemy.y
        };
        _live.set(gid, row);
      }
      row.ptr = enemy.ptr || row.ptr;
      row.x = enemy.x;
      row.y = enemy.y;
      row.rad = enemy.radius || row.rad;
      row.tag = enemy.kind === "spawnable" ? "prop" : "foe";
      if (enemy.moveSpeed > 0) row.gait = enemy.moveSpeed;
      _motion(row, enemy.x, enemy.y, now);
    }
    for (const id of _live.keys()) {
      if (!seen.has(id)) _live.delete(id);
    }
    if (bestGid && _live.has(bestGid)) {
      const keep = _live.get(bestGid);
      bestPtr = keep && keep.ptr ? keep.ptr : null;
    } else {
      const pick = _closest(scanData.myX, scanData.myY);
      bestGid = pick ? pick.gid : null;
      bestPtr = pick && pick.ptr ? pick.ptr : null;
    }
    _cacheShots(now);
    if (_pendingLog) {
      logInfo("aimbot fire", _pendingLog);
      _pendingLog = null;
    }
    if (now - _scrubTs > 1e3) {
      for (const [k, v] of _losMemo) {
        if (now - v.ts > TUNE.LOS_PURGE_MS) _losMemo.delete(k);
      }
      _scrubTs = now;
    }
  }

  // ../pc/src/agent/src/utils/crypto.js
  var K = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function rotr(x, n) {
    return x >>> n | x << 32 - n;
  }
  function sha256(bytes) {
    const len = bytes.length;
    const bitLenHi = Math.floor(len * 8 / 4294967296);
    const bitLenLo = len * 8 >>> 0;
    const totalLen = len + 9 + 63 >> 6 << 6;
    const msg = new Uint8Array(totalLen);
    msg.set(bytes);
    msg[len] = 128;
    const view = new DataView(msg.buffer);
    view.setUint32(totalLen - 8, bitLenHi, false);
    view.setUint32(totalLen - 4, bitLenLo, false);
    let h0 = 1779033703, h1 = 3144134277, h2 = 1013904242, h3 = 2773480762;
    let h4 = 1359893119, h5 = 2600822924, h6 = 528734635, h7 = 1541459225;
    const w = new Uint32Array(64);
    for (let off2 = 0; off2 < totalLen; off2 += 64) {
      for (let i = 0; i < 16; i++) w[i] = view.getUint32(off2 + i * 4, false);
      for (let i = 16; i < 64; i++) {
        const s0 = (rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ w[i - 15] >>> 3) >>> 0;
        const s1 = (rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ w[i - 2] >>> 10) >>> 0;
        w[i] = w[i - 16] + s0 + w[i - 7] + s1 >>> 0;
      }
      let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
      for (let i = 0; i < 64; i++) {
        const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
        const ch = (e & f ^ ~e & g) >>> 0;
        const t1 = h + S1 + ch + K[i] + w[i] >>> 0;
        const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
        const maj = (a & b ^ a & c ^ b & c) >>> 0;
        const t2 = S0 + maj >>> 0;
        h = g;
        g = f;
        f = e;
        e = d + t1 >>> 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 >>> 0;
      }
      h0 = h0 + a >>> 0;
      h1 = h1 + b >>> 0;
      h2 = h2 + c >>> 0;
      h3 = h3 + d >>> 0;
      h4 = h4 + e >>> 0;
      h5 = h5 + f >>> 0;
      h6 = h6 + g >>> 0;
      h7 = h7 + h >>> 0;
    }
    const out = new Uint8Array(32);
    const outView = new DataView(out.buffer);
    [h0, h1, h2, h3, h4, h5, h6, h7].forEach((v, i) => outView.setUint32(i * 4, v, false));
    return out;
  }

  // ../pc/src/agent/src/core/commands.js
  var CMD_BUF_SIZE = 72;
  var _zeroBuf = new Uint8Array(CMD_BUF_SIZE).buffer;
  var MAX_TABLE_TYPE = 22;
  var TABLE_ENTRIES = MAX_TABLE_TYPE + 1;
  var FALLBACK_TYPE_CONST = 3735928559;
  var MASK_SIZE = 16;
  var _typeTable = null;
  var _innerMask = null;
  var _outerMask = null;
  function _loadSigningConstants() {
    if (_typeTable) return true;
    const base2 = getBase();
    const raw = base2.add(offsets.ClientInput_typeConstantTable).readByteArray(TABLE_ENTRIES * 4);
    const bytes = new Uint8Array(raw);
    const table = new Uint32Array(TABLE_ENTRIES);
    for (let i = 0; i < TABLE_ENTRIES; i++) {
      table[i] = (bytes[i * 4] | bytes[i * 4 + 1] << 8 | bytes[i * 4 + 2] << 16 | bytes[i * 4 + 3] << 24) >>> 0;
    }
    _innerMask = new Uint8Array(base2.add(offsets.ClientInput_hashInnerMask).readByteArray(MASK_SIZE));
    _outerMask = new Uint8Array(base2.add(offsets.ClientInput_hashOuterMask).readByteArray(MASK_SIZE));
    _typeTable = table;
    return true;
  }
  function _concat(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a);
    out.set(b, a.length);
    return out;
  }
  function _makeHashBlock(key16, mask, padByte) {
    const block = new Uint8Array(64);
    for (let i = 0; i < 16; i++) block[i] = key16[i] ^ mask[i];
    block.fill(padByte, 16);
    return block;
  }
  function _computeToken(key16, cmdData16) {
    const typeRaw = (cmdData16[4] | cmdData16[5] << 8 | cmdData16[6] << 16 | cmdData16[7] << 24) >>> 0;
    const typeC = typeRaw <= MAX_TABLE_TYPE ? _typeTable[typeRaw] : FALLBACK_TYPE_CONST;
    const msg = new Uint8Array(20);
    for (let i = 0; i < 12; i++) msg[i] = cmdData16[4 + i];
    for (let i = 0; i < 4; i++) msg[12 + i] = cmdData16[i];
    msg[16] = typeC & 255;
    msg[17] = typeC >>> 8 & 255;
    msg[18] = typeC >>> 16 & 255;
    msg[19] = typeC >>> 24 & 255;
    const inner = sha256(_concat(_makeHashBlock(key16, _innerMask, 54), msg));
    const digest = sha256(_concat(_makeHashBlock(key16, _outerMask, 92), inner));
    let token = (digest[0] | (digest[1] & 127) << 8) >>> 0;
    if (token <= 1) token = 1;
    return token;
  }
  var CLIENT_INPUT_TOKEN = 52;
  function signClientInput(ci, battle2) {
    try {
      if (battle2.add(offsets.BattleMode_hashEnabled).readU8() === 0) return 0;
      _loadSigningConstants();
    } catch (_) {
      return 0;
    }
    let key16;
    try {
      key16 = new Uint8Array(battle2.add(offsets.BattleMode_hashKey).readByteArray(16));
    } catch (_) {
      return 0;
    }
    if (!key16 || key16.length < 16) return 0;
    let cmdData16;
    try {
      cmdData16 = new Uint8Array(ci.add(4).readByteArray(16));
    } catch (_) {
      return 0;
    }
    if (!cmdData16 || cmdData16.length < 16) return 0;
    const token = _computeToken(key16, cmdData16);
    try {
      ci.add(CLIENT_INPUT_TOKEN).writeU32(token);
    } catch (_) {
      return 0;
    }
    return token;
  }
  function sendCommand(cmdType, fillFn) {
    try {
      const fns = getFunctions();
      const battle2 = fns.BattleMode_getInstance();
      if (!battle2 || battle2.isNull()) return false;
      const mgr = battle2.add(offsets.BattleMode_clientInputManager).readPointer();
      if (!mgr || mgr.isNull()) return false;
      const ci = fns.operator_new(CMD_BUF_SIZE);
      if (!ci || ci.isNull()) return false;
      ci.writeByteArray(_zeroBuf);
      fns.ClientInput_constructor_int(ci, cmdType | 0);
      if (fillFn) fillFn(ci, battle2);
      signClientInput(ci, battle2);
      fns.ClientInputManager_addInput(mgr, ci);
      return true;
    } catch (_) {
      return false;
    }
  }

  // ../pc/src/agent/src/helpers/dodge_kinds.js
  var FITS = {
    orbit: {
      grow: 0.65,
      pad: 120
    },
    long: {
      grow: 0.55,
      pad: 90
    },
    thick: {
      grow: 0.6,
      pad: 100
    },
    broad: {
      grow: 0.45,
      pad: 70
    },
    half: {
      grow: 0.4,
      pad: 50
    },
    plain: {
      grow: 0.45,
      pad: 60
    },
    ray: {
      grow: 0.5,
      pad: 80
    },
    thin: {
      grow: 0.35,
      pad: 40
    },
    fallback: {
      grow: 0.45,
      pad: 60
    }
  };
  var KINDS = {
    GunslingerProjectile: {
      fit: "thin"
    },
    GunslingerOverchargedProjectile: {
      fit: "thin",
      maxRange: 2600
    },
    BeeSniperProjectile: {
      fit: "thin",
      maxRange: 3e3
    },
    BeeSniperCirclingProjectile: {
      fit: "orbit",
      blob: true
    },
    BeeSniperChargedProjectile: {
      fit: "long",
      strip: true,
      maxRange: 2200
    },
    BeeSniperUltiProjectile: {
      fit: "orbit",
      blob: true
    },
    PiperHandgunProjectile: {
      fit: "half",
      maxRange: 2200
    },
    SniperProjectile: {
      fit: "long",
      strip: true
    },
    BeamerProjectile: {
      fit: "ray",
      chargedRange: 3900,
      speedMul: 1.15,
      strip: true
    },
    BulletstormLastShotProjectile: {
      fit: "long",
      maxRange: 3300
    },
    BulletstormOnShellPickedUpProjectile: {
      fit: "plain",
      maxRange: 3300
    },
    ElectroSniperProjectile: {
      fit: "long",
      strip: true
    },
    ElectroSniperMutantProjectile: {
      fit: "long",
      strip: true
    },
    ElectroSniperUltiProjectile: {
      fit: "broad"
    },
    ElectroSniperOverchargedUltiProjectile: {
      fit: "broad"
    },
    ElectroSniperBounceProjectile: {
      fit: "half"
    },
    ElectroSniperSecondaryProjectile_001: {
      fit: "half"
    },
    HookProjectile: {
      fit: "long"
    },
    SnakeOilProjectile: {
      fit: "long",
      strip: true
    },
    SnakeOilUltiProjectile: {
      fit: "broad",
      blob: true
    },
    SnakeOilHyperUltiProjectile: {
      fit: "broad",
      blob: true
    },
    HookProjectile2: {
      drop: true
    },
    SoulCollectorProjectile: {
      fit: "plain"
    },
    SoulCollectorUlti: {
      fit: "broad",
      blob: true
    },
    MosquitoProjectile: {
      fit: "thin"
    },
    MosquitoProjectilePoison: {
      fit: "long",
      strip: true,
      maxRange: 3300
    },
    SpeedyProjectile: {
      fit: "thin"
    },
    SpeedyOverchargedProjectile: {
      fit: "thin"
    },
    RollerProjectile: {
      fit: "broad"
    },
    RollerGadgetProjectile: {
      fit: "plain"
    },
    BowDudeProjectile: {
      fit: "plain"
    },
    BowDudeOverchargedProjectile: {
      fit: "plain"
    },
    BowDudeProjectileTripWire: {
      fit: "long",
      blob: true
    },
    BowDudeProjectileTripWireBuddy: {
      fit: "long",
      blob: true
    },
    BowDudeGadgetSkillProjectile: {},
    BowDudeGadgetSkillProjectileBuddy: {},
    BowDudeSpawnMineProjectile: {
      drop: true
    },
    BowDudeSpawnOverchargedMineProjectile: {
      drop: true
    },
    RocketGirlProjectile: {
      fit: "thick",
      blast: true,
      lockPath: true,
      growR: 280
    },
    RocketGirlGadgetProjectile: {
      fit: "broad",
      maxRange: 3e3
    },
    RocketGirlUltiProjectile: {
      fit: "thick",
      blast: true,
      growR: 280
    },
    RocketGirlUltiOverchargedProjectile: {
      fit: "thick",
      blast: true,
      growR: 280
    },
    CannonGirlProjectile: {
      fit: "long",
      strip: true
    },
    CannonGirlSmallProjectile: {
      fit: "broad"
    },
    CannonGirlChainProjectile: {
      fit: "half"
    },
    CannonGirlExplosionProjectileOvercharged: {
      fit: "long",
      blob: true
    },
    KnightProjectile1: {
      fit: "thick"
    },
    KnightProjectile2: {
      fit: "thick"
    },
    KnightProjectile3: {
      fit: "thick"
    },
    KnightUltiProjectile: {
      fit: "thick"
    },
    DuplicatorProjectile: {
      fit: "long"
    },
    OverchargedDuplicatorProjectile: {
      fit: "long"
    },
    DuplicatorUltiProjectile: {
      fit: "broad",
      blob: true
    },
    OverchargedDuplicatorUltiProjectile: {
      fit: "broad",
      blob: true
    },
    SpawnerDudeProjectile: {
      fit: "long",
      strip: true,
      growR: 250
    },
    SpawnerDudeMutantProjectile: {
      fit: "long"
    },
    SpawnerDudeIndirectProjectile: {
      fit: "broad",
      blob: true
    },
    SpawnerDudeUltiProjectile: {
      fit: "broad",
      blob: true
    },
    SpawnerDudeOverchargedUltiProjectile: {
      fit: "broad",
      blob: true
    },
    CocoonerProjectile: {
      fit: "long",
      strip: true,
      growR: 150,
      reachAdj: -150
    },
    CocoonerProjectile2: {
      fit: "long",
      growR: 150,
      home: true
    },
    CocoonerUltiProjectile: {
      fit: "broad",
      blob: true
    },
    CocoonerOverchargedUltiProjectile: {
      fit: "broad",
      blob: true
    },
    AmbusherProjectile: {
      fit: "thick"
    },
    AmbusherUltiProjectile: {
      fit: "long"
    },
    AmbusherUltiProjectile2: {
      fit: "long"
    },
    AmbusherOverchargedUltiProjectile: {
      fit: "long"
    },
    CrabProjectile: {
      fit: "long",
      strip: true
    },
    CrabUltiProjectile: {
      fit: "broad"
    },
    CrabOverchargedUltiProjectile: {
      fit: "broad"
    },
    CrabOverchargedUltiReturnProjectile: {
      fit: "broad"
    },
    FishTankUltiProjectile: {
      fit: "broad"
    },
    FishTankUltiProjectileSmall: {
      fit: "broad"
    },
    CookerProjectile: {
      fit: "long",
      strip: true,
      reachAdj: -450
    },
    MaisieProjectile: {
      fit: "long",
      strip: true,
      lockPath: true,
      reachAdj: 900,
      fade: true,
      fadeBase: 786.63,
      fadeK: 1231e-6
    },
    TrickShotDudeProjectile: {
      fit: "thin"
    },
    TrickShotDudeUltiProjectile: {
      fit: "thin"
    },
    TrickShotDudeOverchargedProjectile: {
      fit: "thin"
    },
    ControllerProjectile: {
      fit: "broad",
      growR: 150,
      reachAdj: 600
    },
    ControllerArchetypeCollabProjectileLvl1: {
      fit: "plain"
    },
    ControllerArchetypeCollabProjectileLvl2: {
      fit: "plain"
    },
    ControllerArchetypeCollabProjectileLvl3: {
      fit: "plain"
    },
    ControllerUltiProjectile: {
      drop: true
    },
    ControllerUltiOverchargedProjectile: {
      drop: true
    },
    AxeJugglerProjectile: {
      fit: "broad",
      reachAdj: 200
    },
    AxeJugglerProjectile2: {
      fit: "long"
    },
    AxeJugglerOverchargedProjectile2: {
      fit: "long"
    },
    SplitterProjectile: {
      fit: "long"
    },
    ArtilleryDudeProjectile: {
      fit: "broad",
      strip: true
    },
    ArtilleryDudeProjectile2: {
      fit: "thin"
    },
    ArtilleryDudeUltiProjectile: {
      fit: "broad",
      blob: true
    },
    ArtilleryDudeOverchargedUltiProjectile: {
      fit: "broad",
      blob: true
    },
    ArtilleryDudeTurretProjectile: {
      drop: true
    },
    ArtilleryDudeOverchargedTurretProjectile: {
      drop: true
    },
    PercenterProjectile: {
      fit: "long",
      strip: true,
      lockPath: true,
      maxRange: 2800
    },
    PercenterOverchargedProjectile: {
      fit: "long",
      strip: true,
      lockPath: true,
      maxRange: 2800
    },
    MeepleProjectile: {
      fit: "plain",
      growR: 150,
      reachAdj: 200
    },
    MeepleUltiProjectile: {
      fit: "broad",
      blob: true
    },
    MeepleOverchargedUltiProjectile: {
      fit: "broad",
      blob: true
    },
    MeepleWallProjectile: {
      drop: true
    },
    ShamanProjectile: {
      fit: "long",
      strip: true
    },
    CoopRangedEnemyProjectile: {
      maxRange: 2500
    },
    SniperHomingProjectile: {
      fit: "long",
      maxRange: 3500,
      growR: 100,
      strip: true
    },
    MechanicProjectile2: {
      fit: "fallback",
      maxRange: 2e3
    },
    MechanicProjectile3: {
      fit: "fallback",
      maxRange: 2e3
    },
    DoorManCaneGadgetProjectile: {
      fit: "fallback",
      maxRange: 3e3
    },
    MummyProjectile: {
      fit: "long",
      growR: 150,
      reachAdj: -750,
      fade: true,
      fadeBase: 4461.04,
      fadeK: -971e-6
    },
    WhirlwindProjectile: {
      fit: "long",
      growR: 250,
      reachAdj: -250,
      lockPath: true
    },
    WhirlwindProjectile2: {
      growR: 250,
      home: true
    },
    MorningstarProjectile: {
      growR: 150,
      maxRange: 2700
    },
    MorningstarProjectileRecall: {
      growR: 150,
      home: true
    },
    AlternatorHealProjectile: {
      fit: "fallback",
      maxRange: 2800
    },
    AlternatorDamageProjectile: {
      fit: "fallback",
      maxRange: 2800
    },
    KickerDudeProjectile2: {
      fit: "fallback",
      maxRange: 2200
    },
    DancerProjectileSingle: {
      fit: "fallback",
      maxRange: 2700
    },
    DancerProjectileDouble: {
      fit: "fallback",
      maxRange: 2500
    },
    DancerProjectileTriple: {
      fit: "fallback",
      maxRange: 1700
    }
  };
  function kindOf(name) {
    return name && KINDS[name] || null;
  }
  function fitOf(name) {
    const spec = kindOf(name);
    if (spec && spec.fit && FITS[spec.fit]) return FITS[spec.fit];
    return FITS.fallback;
  }

  // ../pc/src/agent/src/helpers/dodge_profiles.js
  var LOGIC_TICK_MS = 50;
  var SPIKE = {
    spokes: 6,
    childRadius: 50,
    spawnOffset: 200,
    childTravel: 1100,
    flightDist: 2035,
    flightTimeMs: 963,
    burstLifeMs: 360,
    blastMs: 700,
    curveDeviationDeg: 22
  };
  SPIKE.armLength = SPIKE.spawnOffset + SPIKE.childTravel;
  var SPIKE_CURVE_ARC = [
    [0, 200, 0],
    [110, 515, 32],
    [207, 797, 216],
    [312, 999, 519],
    [411, 1066, 930],
    [513, 995, 1377],
    [557, 883, 1611]
  ];
  var _spikeVariant = null;
  function _crossProfile(spec) {
    const armLength = spec.spawnOffset + spec.childTravel;
    const burstLifeMs = spec.childTravel / spec.childSpeed * 1e3;
    return function(projectile, now) {
      const cx = projectile.targetX;
      const cy = projectile.targetY;
      if (!isFinite(cx) || !isFinite(cy)) return null;
      if (cx === 0 || cy === 0) return null;
      if (Math.abs(cx) > 1e6 || Math.abs(cy) > 1e6) return null;
      const landAt = (projectile.spawnedAt || now) + spec.flightTimeMs;
      const t0 = landAt - LOGIC_TICK_MS;
      const t1 = landAt + burstLifeMs + LOGIC_TICK_MS;
      return [
        {
          ax: cx - armLength,
          ay: cy,
          bx: cx + armLength,
          by: cy,
          radius: spec.childRadius,
          t0,
          t1
        },
        {
          ax: cx,
          ay: cy - armLength,
          bx: cx,
          by: cy + armLength,
          radius: spec.childRadius,
          t0,
          t1
        }
      ];
    };
  }
  function _spikeEndpoint(projectile) {
    const rad = (projectile.angle || 0) * Math.PI / 180;
    const dirX = Math.cos(rad);
    const dirY = Math.sin(rad);
    const dist = traceWallHit(projectile.spawnX, projectile.spawnY, dirX, dirY, SPIKE.flightDist, BLOCKS_PROJECTILES);
    return {
      x: projectile.spawnX + dirX * dist,
      y: projectile.spawnY + dirY * dist,
      dist
    };
  }
  function _cactusProfile(projectile, now) {
    if (!_spikeVariant) return null;
    const end = _spikeEndpoint(projectile);
    const burstAt = (projectile.spawnedAt || now) + SPIKE.flightTimeMs * (end.dist / SPIKE.flightDist);
    const hazards = [];
    if (projectile.spawnAreaRadius > 0) {
      hazards.push(
        {
          x: end.x,
          y: end.y,
          radius: projectile.spawnAreaRadius,
          t0: burstAt,
          t1: burstAt + (projectile.spawnAreaActiveTime || SPIKE.blastMs)
        }
      );
    }
    if (_spikeVariant === "straight") {
      const t0 = burstAt - LOGIC_TICK_MS;
      const t1 = burstAt + SPIKE.burstLifeMs + LOGIC_TICK_MS;
      for (let i = 0; i < 3; i++) {
        const a = i * Math.PI / 3;
        const dx = Math.cos(a) * SPIKE.armLength;
        const dy = Math.sin(a) * SPIKE.armLength;
        hazards.push(
          {
            ax: end.x - dx,
            ay: end.y - dy,
            bx: end.x + dx,
            by: end.y + dy,
            radius: SPIKE.childRadius,
            t0,
            t1
          }
        );
      }
      return hazards;
    }
    for (let s = 0; s < SPIKE.spokes; s++) {
      const rot = s * (2 * Math.PI / SPIKE.spokes);
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);
      for (let k = 0; k + 1 < SPIKE_CURVE_ARC.length; k++) {
        const ta = SPIKE_CURVE_ARC[k][0];
        const ax = SPIKE_CURVE_ARC[k][1];
        const ay = SPIKE_CURVE_ARC[k][2];
        const tb = SPIKE_CURVE_ARC[k + 1][0];
        const bx = SPIKE_CURVE_ARC[k + 1][1];
        const by = SPIKE_CURVE_ARC[k + 1][2];
        hazards.push(
          {
            ax: end.x + ax * cr - ay * sr,
            ay: end.y + ax * sr + ay * cr,
            bx: end.x + bx * cr - by * sr,
            by: end.y + bx * sr + by * cr,
            radius: SPIKE.childRadius,
            t0: burstAt + ta,
            t1: burstAt + tb
          }
        );
      }
    }
    return hazards;
  }
  function noteBurstDeath(record) {
    if (_spikeVariant || !record || record.name !== "CactusProjectile") return;
    const dx = record.x - record.spawnX;
    const dy = record.y - record.spawnY;
    if (dx * dx + dy * dy < 1) return;
    const chord = Math.atan2(dy, dx) * 180 / Math.PI;
    let deviation = Math.abs(((chord - (record.angle || 0)) % 360 + 540) % 360 - 180);
    _spikeVariant = deviation > SPIKE.curveDeviationDeg ? "curve" : "straight";
  }
  function resetProfiles() {
    _spikeVariant = null;
  }
  var _profiles = /* @__PURE__ */ new Map([
    ["CrossBomberProjectile", _crossProfile(
      {
        childRadius: 125,
        childSpeed: 3e3,
        spawnOffset: 200,
        childTravel: 800,
        flightTimeMs: 1015
      }
    )],
    ["CrossBomberUltiProjectile", _crossProfile(
      {
        childRadius: 375,
        childSpeed: 3e3,
        spawnOffset: 100,
        childTravel: 1600,
        flightTimeMs: 1115
      }
    )],
    ["CactusProjectile", _cactusProfile],
    ["CactusSpike", function() {
      return _spikeVariant ? [] : null;
    }]
  ]);
  var _replaceGeneric = /* @__PURE__ */ new Set(["CrossBomberProjectile", "CrossBomberUltiProjectile", "CactusSpike"]);
  function blocksLinear(name) {
    return !!name && _replaceGeneric.has(name);
  }
  function shapeHazards(projectile, now) {
    if (!projectile || !projectile.name) return null;
    const profile = _profiles.get(projectile.name);
    if (!profile) return null;
    return profile(projectile, now);
  }

  // ../pc/src/agent/src/features/autododge.js
  var MOVE_INPUT_TYPE = 2;
  var TUNE2 = {
    AWARE: 3200,
    RANGE_FALLBACK: 2800,
    TICK_MS: 16,
    DIR_COUNT: 48,
    SKIN: 50,
    LOCK_MS: 130,
    REACH: 600,
    HORIZON_S: 1,
    KEEP_BAND: 120,
    MOMENTUM: 100,
    ENGAGE: 40,
    RELEASE_GRACE_MS: 120,
    WALL_HIT: 9e3,
    PROBE_N: 3,
    PROBE_T: 0.35,
    WALL_BODY: 240
  };
  var _heading = null;
  var _headingIdx = -1;
  var _holdUntil = 0;
  var _lastDangerTs = 0;
  var _lastTick = 0;
  var _muted = /* @__PURE__ */ new Set();
  var _ring = [];
  var _scoreBuf = [];
  var _skip = /* @__PURE__ */ new Set();
  var _options = {
    reactionSpeed: 50,
    directionPrecision: 48,
    safetyMargin: 25
  };
  function _buildRing() {
    _ring.length = 0;
    const n = TUNE2.DIR_COUNT;
    for (let i = 0; i < n; i++) {
      const a = Math.PI * 2 * i / n;
      _ring.push(
        {
          x: Math.cos(a),
          y: Math.sin(a)
        }
      );
    }
    _scoreBuf = new Array(n).fill(0);
    _headingIdx = -1;
  }
  _buildRing();
  function _syncTuning() {
    const t = Math.max(0, Math.min(100, _options.reactionSpeed)) / 100;
    TUNE2.TICK_MS = Math.max(16, Math.round(32 - t * 16));
    TUNE2.LOCK_MS = Math.max(80, Math.round(260 - t * 180));
    const n = Math.max(8, Math.min(128, _options.directionPrecision | 0));
    if (n !== TUNE2.DIR_COUNT) {
      TUNE2.DIR_COUNT = n;
      _buildRing();
    }
    TUNE2.SKIN = Math.max(0, Math.min(120, _options.safetyMargin)) * 2;
  }
  _syncTuning();
  function getDodgeDir() {
    return _heading;
  }
  function _ballR(p) {
    if (p.radius > 0) return p.radius;
    return 100;
  }
  function _traveled(p) {
    const sx = p.spawnX, sy = p.spawnY;
    if (!isFinite(sx) || !isFinite(sy)) return 0;
    return Math.hypot(p.x - sx, p.y - sy);
  }
  function _kindReach(p, spec, spd) {
    let r = spec && spec.maxRange > 0 ? spec.maxRange : 0;
    if (spec && spec.chargedRange > 0 && spd > 3500) r = spec.chargedRange;
    if (r <= 0 && p.castRange > 0) r = p.castRange;
    if (r <= 0 && p.isThrower && (p.targetX || p.targetY) && isFinite(p.spawnX) && isFinite(p.spawnY)) {
      const td = Math.hypot(p.targetX - p.spawnX, p.targetY - p.spawnY);
      if (td > 0) r = td;
    }
    if (r <= 0) r = TUNE2.RANGE_FALLBACK;
    if (spec && spec.reachAdj) r += spec.reachAdj;
    if (r > 0 && r < 7e4) return r;
    return TUNE2.RANGE_FALLBACK;
  }
  function _homePos(p) {
    if (isFinite(p.ownerX) && isFinite(p.ownerY) && (p.ownerX || p.ownerY)) {
      return {
        x: p.ownerX,
        y: p.ownerY
      };
    }
    if (p.targetX || p.targetY) {
      return {
        x: p.targetX,
        y: p.targetY
      };
    }
    return null;
  }
  function _lifeLeft(p, spec, spd, nowMs) {
    const maxR = _kindReach(p, spec, spd);
    if (spec && spec.fade) {
      const age = Math.max(0, nowMs - (p.spawnedAt || nowMs));
      return Math.max(0, maxR * (1 - age / 1e3));
    }
    if (spec && spec.home) {
      const home = _homePos(p);
      if (home) return Math.hypot(home.x - p.x, home.y - p.y);
    }
    const flown = _traveled(p);
    return Math.max(0, maxR - flown);
  }
  function _inAware(myX, myY, hazard, zoneSq) {
    if (hazard.segment) {
      const d = _segDist(myX, myY, hazard.segment.ax, hazard.segment.ay, hazard.segment.bx, hazard.segment.by);
      return d * d <= zoneSq;
    }
    const dx = hazard.x - myX, dy = hazard.y - myY;
    return dx * dx + dy * dy <= zoneSq;
  }
  function _collectLive(myX, myY, myRadius, nowMs) {
    const out = [];
    const live = /* @__PURE__ */ new Set();
    const shots = scanData.projectiles;
    if (!shots || shots.length === 0) {
      if (_muted.size > 0) _muted.clear();
      return out;
    }
    const zoneSq = TUNE2.AWARE * TUNE2.AWARE;
    const bodyPad = myRadius + TUNE2.SKIN;
    const deaths = scanData.destroyed;
    if (deaths && deaths.length) {
      for (let d = 0; d < deaths.length; d++) noteBurstDeath(deaths[d]);
    }
    for (let i = 0; i < shots.length; i++) {
      const p = shots[i];
      const gid = p.gid;
      if (!gid) continue;
      live.add(gid);
      const owner = p.ownerName;
      if (owner && _skip.has(canonBrawlerName(owner) || owner)) _muted.add(gid);
      if (_muted.has(gid)) continue;
      const shaped = shapeHazards(p, nowMs);
      if (shaped) {
        for (let c = 0; c < shaped.length; c++) {
          const cap = shaped[c];
          const until = (cap.t1 - nowMs) / 1e3;
          if (until <= 0) continue;
          const hazard = {
            rad: cap.radius + bodyPad,
            blob: cap.ax === void 0,
            until,
            name: p.name || cap.name || ""
          };
          if (cap.ax === void 0) {
            hazard.x = cap.x;
            hazard.y = cap.y;
            hazard.vx = 0;
            hazard.vy = 0;
          } else {
            hazard.segment = cap;
          }
          if (_inAware(myX, myY, hazard, zoneSq)) out.push(hazard);
        }
      }
      if (shaped && blocksLinear(p.name)) continue;
      const name = p.name || "";
      const spec = kindOf(name);
      if (spec && spec.drop) continue;
      const dx = p.x - myX, dy = p.y - myY;
      if (dx * dx + dy * dy > zoneSq) continue;
      let vx = p.vx, vy = p.vy;
      if (!isFinite(vx) || !isFinite(vy)) {
        vx = 0;
        vy = 0;
      }
      const flown = _traveled(p);
      if (spec && spec.lockPath && flown > 120 && isFinite(p.spawnX) && isFinite(p.spawnY)) {
        vx = (p.x - p.spawnX) / flown * (p.speed || 1);
        vy = (p.y - p.spawnY) / flown * (p.speed || 1);
      }
      let spd = Math.hypot(vx, vy);
      if (spec && spec.speedMul > 0 && spd > 3500) {
        vx *= spec.speedMul;
        vy *= spec.speedMul;
        spd *= spec.speedMul;
      }
      const slow = (p.speed || 0) > 0 && p.speed < 1600;
      const lockPath = !!(spec && spec.lockPath) || !!p.isBeam;
      const blob = !!(spec && spec.blob) || !lockPath && (p.isThrower || slow);
      const bodyR = myRadius + TUNE2.SKIN;
      const fit = fitOf(name);
      const growR = spec && spec.growR || 0;
      const shotR = _ballR(p) + growR;
      const rad = shotR + bodyR + fit.pad + shotR * fit.grow;
      let ux = 0, uy = 0;
      let playerAlong = 0;
      if (spd >= 1) {
        ux = vx / spd;
        uy = vy / spd;
      }
      if (!blob && spd >= 1) {
        playerAlong = (myX - p.x) * ux + (myY - p.y) * uy;
        if (playerAlong < -50) continue;
        if (!p.isThrower) {
          const hitX = p.x + ux * Math.max(playerAlong, 0);
          const hitY = p.y + uy * Math.max(playerAlong, 0);
          if (!losCheck(p.x, p.y, hitX, hitY, BLOCKS_PROJECTILES)) continue;
        }
      }
      const left = _lifeLeft(p, spec, spd, nowMs);
      if (left <= 10) continue;
      const gap = Math.hypot(p.x - myX, p.y - myY) - bodyR - shotR;
      if (left < 0.85 * Math.max(0, gap)) continue;
      if (!blob && spd >= 1 && playerAlong > left + shotR) continue;
      out.push(
        {
          x: p.x,
          y: p.y,
          vx: blob ? 0 : vx,
          vy: blob ? 0 : vy,
          rad,
          pathLen: left + shotR,
          left,
          name,
          blob,
          owner: owner ? canonBrawlerName(owner) || owner : "",
          castRange: p.castRange || 0,
          age: spec && spec.fade ? Math.max(0, nowMs - (p.spawnedAt || nowMs)) : 0,
          fadeBase: spec && spec.fadeBase || 0,
          fadeK: spec && spec.fadeK || 0
        }
      );
    }
    for (const k of _muted) {
      if (!live.has(k)) _muted.delete(k);
    }
    return out;
  }
  function _segDist(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    let t = lenSq < 1e-6 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lenSq;
    if (t < 0) t = 0;
    else if (t > 1) t = 1;
    return Math.hypot(px - (ax + dx * t), py - (ay + dy * t));
  }
  function _fadeVel(t, dt) {
    let vx = t.vx || 0;
    let vy = t.vy || 0;
    if (t.fadeBase && t.fadeK) {
      const now = Math.max(0, t.age || 0);
      const later = now + (dt || 0) * 1e3;
      const cur = t.fadeBase * Math.exp(t.fadeK * now);
      const nxt = t.fadeBase * Math.exp(t.fadeK * later);
      if (cur > 1e-6) {
        const r = nxt / cur;
        vx *= r;
        vy *= r;
      }
    }
    return {
      x: vx,
      y: vy
    };
  }
  function _clearanceFor(threats, myX, myY, mvx, mvy) {
    let minClear = Infinity;
    const horizon = TUNE2.HORIZON_S;
    for (let i = 0; i < threats.length; i++) {
      const t = threats[i];
      if (t.segment) {
        const maxT2 = t.until > 0 ? Math.min(horizon, t.until) : horizon;
        for (let step = 0; step <= 4; step++) {
          const ts = maxT2 * (step / 4);
          const d = _segDist(myX + mvx * ts, myY + mvy * ts, t.segment.ax, t.segment.ay, t.segment.bx, t.segment.by) - t.rad;
          if (d < minClear) minClear = d;
        }
        continue;
      }
      const vel = _fadeVel(t, 0);
      const spd = Math.hypot(vel.x, vel.y);
      let maxT = horizon;
      if (spd > 1) {
        if (t.left > 0) maxT = Math.min(maxT, t.left / spd);
        if (t.pathLen > 0) maxT = Math.min(maxT, t.pathLen / spd);
      }
      if (t.until > 0) maxT = Math.min(maxT, t.until);
      const relx = t.x - myX, rely = t.y - myY;
      const vrx = vel.x - mvx, vry = vel.y - mvy;
      const vv = vrx * vrx + vry * vry;
      let cx, cy;
      if (vv < 1e-6) {
        cx = relx;
        cy = rely;
      } else {
        let ts = -(relx * vrx + rely * vry) / vv;
        if (ts < 0) ts = 0;
        else if (ts > maxT) ts = maxT;
        cx = relx + vrx * ts;
        cy = rely + vry * ts;
      }
      const clear = Math.sqrt(cx * cx + cy * cy) - t.rad;
      if (clear < minClear) minClear = clear;
    }
    return minClear;
  }
  function _wallAhead(myX, myY, dir, speed, bodyR) {
    const step = speed * TUNE2.PROBE_T;
    let raw = 0;
    for (let s = 1; s <= TUNE2.PROBE_N; s++) {
      const px = myX + dir.x * step * s;
      const py = myY + dir.y * step * s;
      if (isBlockedWide(px, py, bodyR, BLOCKS_MOVEMENT)) {
        raw += TUNE2.WALL_HIT * (TUNE2.PROBE_N - s + 1);
      }
    }
    return raw;
  }
  function _wallR() {
    return TUNE2.WALL_BODY;
  }
  function clampMoveTarget(tx, ty) {
    return _clampTarget(tx, ty);
  }
  function sendBattleMove(logic, tx, ty) {
    return _sendMove(logic, tx, ty);
  }
  function _clampToMap(v, maxTiles) {
    const max = maxTiles * TILE_SIZE - 1;
    if (max <= 0) return v;
    if (v < 0) return 0;
    if (v > max) return max;
    return v;
  }
  function _clampTarget(tx, ty) {
    const w = getWallCacheW(), h = getWallCacheH();
    if (w <= 0 || h <= 0) return {
      x: tx,
      y: ty
    };
    return {
      x: _clampToMap(tx, w),
      y: _clampToMap(ty, h)
    };
  }
  function _sendMove(logic, tx, ty) {
    if (!logic || logic.isNull()) return false;
    try {
      const fns = getFunctions();
      fns.LogicBattleModeClient_setClientPredictionMoveTo(logic, tx, ty, 1);
      return sendCommand(MOVE_INPUT_TYPE, (ci) => {
        ci.add(offsets.ClientInput_x).writeS32(tx);
        ci.add(offsets.ClientInput_y).writeS32(ty);
      });
    } catch (e) {
      logWarn(
        "autododge send failed",
        {
          err: String(e && e.message || e)
        }
      );
      return false;
    }
  }
  function _clearHeading() {
    _heading = null;
    _headingIdx = -1;
    _holdUntil = 0;
  }
  function updateAutododge() {
    if (!state.autododge) return;
    if (scanData.lastUpdate === 0) return;
    const now = Date.now();
    if (now - _lastTick < TUNE2.TICK_MS) return;
    _lastTick = now;
    const myX = scanData.myX;
    const myY = scanData.myY;
    const speed = scanData.mySpeed || 720;
    const myRadius = scanData.myRadius || 60;
    const hazards = _collectLive(myX, myY, myRadius, now);
    if (hazards.length === 0) {
      if (_heading && now - _lastDangerTs > TUNE2.RELEASE_GRACE_MS) _clearHeading();
      return;
    }
    const stayClear = _clearanceFor(hazards, myX, myY, 0, 0);
    const inDanger = stayClear < TUNE2.ENGAGE;
    if (inDanger) _lastDangerTs = now;
    if (!inDanger && (!_heading || now - _lastDangerTs > TUNE2.RELEASE_GRACE_MS)) {
      if (_heading) _clearHeading();
      return;
    }
    const prevIdx = _headingIdx >= 0 && _headingIdx < _ring.length ? _headingIdx : -1;
    const prevDir = prevIdx >= 0 ? _ring[prevIdx] : null;
    const bodyR = _wallR();
    let bestIdx = 0, bestScore = -Infinity;
    for (let i = 0; i < _ring.length; i++) {
      const d = _ring[i];
      let s = _clearanceFor(hazards, myX, myY, speed * d.x, speed * d.y);
      s -= _wallAhead(myX, myY, d, speed, bodyR);
      if (prevDir) s += TUNE2.MOMENTUM * (d.x * prevDir.x + d.y * prevDir.y);
      _scoreBuf[i] = s;
      if (s > bestScore) {
        bestScore = s;
        bestIdx = i;
      }
    }
    let chosenIdx = bestIdx;
    if (prevIdx >= 0 && now < _holdUntil && chosenIdx !== prevIdx) {
      if (_scoreBuf[prevIdx] + TUNE2.KEEP_BAND >= _scoreBuf[chosenIdx]) {
        chosenIdx = prevIdx;
      } else {
        _holdUntil = now + TUNE2.LOCK_MS;
      }
    } else if (now >= _holdUntil) {
      _holdUntil = now + TUNE2.LOCK_MS;
    }
    if (_scoreBuf[chosenIdx] <= stayClear) {
      if (_heading) _clearHeading();
      return;
    }
    const chosen = _ring[chosenIdx];
    _headingIdx = chosenIdx;
    _heading = chosen;
    const target = {
      x: Math.round(myX + chosen.x * TUNE2.REACH),
      y: Math.round(myY + chosen.y * TUNE2.REACH)
    };
    const ok = state.speedhack ? true : _sendMove(scanData.battleModeClient, target.x, target.y);
    if (chosenIdx !== prevIdx) {
      const names = [];
      for (let i = 0; i < hazards.length && names.length < 4; i++) {
        if (hazards[i].name) names.push(hazards[i].name);
      }
      logInfo(
        "autododge dodge",
        {
          names,
          id: names[0] || "",
          x: target.x,
          y: target.y,
          myX: myX | 0,
          myY: myY | 0,
          dist: Math.hypot(target.x - myX, target.y - myY) | 0,
          threats: hazards.length,
          sent: ok
        }
      );
    }
  }
  function resetAutododge() {
    if (_muted.size > 0 || _heading) {
      logInfo(
        "autododge reset",
        {
          tracks: _muted.size,
          heading: !!_heading,
          headingIdx: _headingIdx
        }
      );
    }
    _muted.clear();
    resetProfiles();
    _clearHeading();
    _lastDangerTs = 0;
    _lastTick = 0;
  }
  function setupAutododge() {
    enableProjectileTracking();
  }

  // ../pc/src/agent/src/features/camera.js
  var _opts2 = {
    mode: 3
  };
  var _bs = null;
  var _bsTs = 0;
  var _defaultMode = 0;
  var _capturedFor = null;
  var _applied = false;
  function getBattleScreen() {
    return _bs;
  }
  function getBattleScreenTs() {
    return _bsTs;
  }
  function setCameraOptions(o) {
    if (!o || typeof o !== "object") return;
    if (typeof o.mode === "number" && isFinite(o.mode)) {
      const mode = o.mode | 0;
      _opts2.mode = mode === 6 ? 6 : 3;
    }
  }
  function resetCamera() {
    _bs = null;
    _bsTs = 0;
  }
  function captureDefaults(bs) {
    _defaultMode = bs.add(offsets.BattleScreen_cameraMode).readS32() | 0;
    _capturedFor = bs;
    _applied = false;
    logInfo(
      "camera default mode",
      {
        mode: _defaultMode
      }
    );
  }
  function setupCamera(base2) {
    Interceptor.attach(
      base2.add(offsets.BattleScreen__updateCameraParameters),
      {
        onEnter(args) {
          const bs = args[0];
          if (!bs || bs.isNull()) return;
          _bs = bs;
          _bsTs = Date.now();
          try {
            if (!_capturedFor || !bs.equals(_capturedFor)) captureDefaults(bs);
            if (state.camera) {
              if (!_applied) logInfo(
                "camera mode applied",
                {
                  mode: _opts2.mode | 0,
                  previous: _defaultMode
                }
              );
              bs.add(offsets.BattleScreen_cameraMode).writeS32(_opts2.mode | 0);
              _applied = true;
            } else if (_applied) {
              bs.add(offsets.BattleScreen_cameraMode).writeS32(_defaultMode);
              _applied = false;
              logInfo(
                "camera mode restored",
                {
                  mode: _defaultMode
                }
              );
            }
          } catch (_) {
          }
        }
      }
    );
  }

  // ../pc/src/agent/src/features/chatspam.js
  var TEAM_CHAT_MESSAGE_SIZE = 512;
  var MAX_MESSAGE_LENGTH = 128;
  var MIN_INTERVAL_MS = 50;
  var MAX_INTERVAL_MS = 6e4;
  var _msgCtor = null;
  var _mmSendMessage = null;
  var messageManagerPtr = null;
  var ready = false;
  var options = {
    message: "",
    intervalMs: 600
  };
  var timer = null;
  var _running = false;
  function _sendOnce() {
    if (!ready) return;
    const text = options.message;
    if (!text) return;
    try {
      const mm = messageManagerPtr.readPointer();
      if (!mm || mm.isNull()) return;
      const fns = getFunctions();
      const msg = fns.operator_new(TEAM_CHAT_MESSAGE_SIZE);
      if (!msg || msg.isNull()) return;
      _msgCtor(msg);
      const field = msg.add(offsets.TeamChatMessage_messageOffset);
      fns.StringCtor(field, Memory.allocUtf8String(text.slice(0, MAX_MESSAGE_LENGTH)));
      _mmSendMessage(mm, msg);
      logEvery(
        10,
        "chatspam sent",
        {
          length: text.length,
          intervalMs: options.intervalMs | 0,
          preview: text.slice(0, 24)
        }
      );
    } catch (e) {
      logError(
        "chatspam send failed",
        {
          err: String(e && e.message || e)
        }
      );
    }
  }
  function _stopTimer() {
    if (timer !== null) {
      try {
        clearInterval(timer);
      } catch (_) {
      }
      timer = null;
    }
  }
  function _startTimer() {
    _stopTimer();
    const ms = Math.max(MIN_INTERVAL_MS, Math.min(MAX_INTERVAL_MS, options.intervalMs | 0));
    timer = setInterval(_sendOnce, ms);
  }
  function setupChatSpam(base2) {
    try {
      const fns = getFunctions();
      _msgCtor = fns.TeamChatMessage_ctor;
      _mmSendMessage = fns.MessageManager_sendMessage;
      if (!_msgCtor || !_mmSendMessage || !offsets.MessageManager_instance) return;
      messageManagerPtr = base2.add(offsets.MessageManager_instance);
      ready = true;
    } catch (_) {
      ready = false;
    }
  }
  function setChatSpamOptions(o) {
    if (!o || typeof o !== "object") return;
    if (typeof o.message === "string") {
      options.message = o.message.slice(0, MAX_MESSAGE_LENGTH);
    }
    if (typeof o.intervalMs === "number" && isFinite(o.intervalMs)) {
      options.intervalMs = Math.max(MIN_INTERVAL_MS, Math.min(MAX_INTERVAL_MS, o.intervalMs | 0));
      if (_running) _startTimer();
    }
  }
  function startChatSpam() {
    if (!ready) return false;
    if (_running) return true;
    _running = true;
    _startTimer();
    logInfo(
      "chatspam started",
      {
        intervalMs: options.intervalMs | 0,
        length: options.message.length,
        preview: options.message.slice(0, 24)
      }
    );
    return true;
  }
  function stopChatSpam() {
    if (_running) logInfo("chatspam stopped");
    _running = false;
    _stopTimer();
  }
  function resetChatSpam() {
    stopChatSpam();
  }

  // ../pc/src/agent/src/core/egl.js
  var _hookCb = null;
  var _swapListeners = [];
  var _swapHooked = false;
  function _parseGOTFromPLT(pltAddr) {
    try {
      const insn0 = pltAddr.readU32();
      const insn1 = pltAddr.add(4).readU32();
      if ((insn0 >>> 24 & 159) !== 144) return null;
      const immlo = insn0 >>> 29 & 3;
      const immhi = insn0 >>> 5 & 524287;
      const imm21 = immhi << 2 | immlo;
      const signed = imm21 & 1048576 ? imm21 - 2097152 : imm21;
      const imm12 = insn1 >>> 10 & 4095;
      const ldrOff = imm12 * 8;
      const pcPage = ptr(pltAddr).and(ptr("0xFFFFFFFFFFFFF000"));
      const gotPage = signed >= 0 ? pcPage.add(signed * 4096) : pcPage.sub(-signed * 4096);
      return gotPage.add(ldrOff);
    } catch (_) {
      return null;
    }
  }
  function _scanGOT(libgMod, eglReal) {
    const tmp = Memory.alloc(8);
    tmp.writePointer(eglReal);
    const patBytes = [];
    for (let i = 0; i < 8; i++) patBytes.push(tmp.add(i).readU8().toString(16).padStart(2, "0"));
    const pattern = patBytes.join(" ");
    const libgEnd = libgMod.base.add(libgMod.size);
    for (const prot of ["r--", "rw-"]) {
      for (const range of Process.enumerateRanges(prot)) {
        if (range.base.compare(libgMod.base) < 0 || range.base.compare(libgEnd) >= 0) continue;
        const hits = Memory.scanSync(range.base, range.size, pattern);
        if (hits.length > 0) return hits[0].address;
      }
    }
    return null;
  }
  function _eglFromMaps() {
    try {
      const text = File.readAllText("/proc/self/maps");
      for (const line of text.split("\n")) {
        if (!/\/libEGL\.so(?:\.\d+)?$/i.test(line)) continue;
        const start = line.split("-")[0];
        const mod = Process.findModuleByAddress(ptr("0x" + start));
        if (mod) return mod;
      }
    } catch (_) {
    }
    return null;
  }
  function findEglExport(name) {
    const modules = [];
    for (const so of ["libEGL.so", "libEGL.so.1"]) {
      try {
        const mod = Process.findModuleByName(so);
        if (mod) modules.push(mod);
      } catch (_) {
      }
    }
    try {
      for (const mod of Process.enumerateModules()) {
        if (/libEGL(?:\.so(?:\.\d+)?)?$/i.test(mod.name)) modules.push(mod);
      }
    } catch (_) {
    }
    const mapped = _eglFromMaps();
    if (mapped) modules.push(mapped);
    for (const mod of modules) {
      try {
        const address = mod.findExportByName(name);
        if (address) return address;
      } catch (_) {
      }
    }
    try {
      const address = Module.findExportByName(null, name);
      if (address) return address;
    } catch (_) {
    }
    return null;
  }
  function findSwapBuffers() {
    return findEglExport("eglSwapBuffers");
  }
  function _dispatchSwap(dpy, surface) {
    for (let i = 0; i < _swapListeners.length; i++) {
      try {
        _swapListeners[i](dpy, surface);
      } catch (_) {
      }
    }
  }
  function attachSwapBuffers(eglReal, onSwap) {
    try {
      Interceptor.attach(
        eglReal,
        {
          onEnter(args) {
            onSwap(args[0], args[1]);
          }
        }
      );
      return true;
    } catch (_) {
      return false;
    }
  }
  function patchSwapBuffersGOT(eglReal, onSwap) {
    const libgMod = engineModule();
    if (!libgMod) return false;
    const pltEntry = libgMod.enumerateImports().find((i) => i.name === "eglSwapBuffers");
    if (!pltEntry) return false;
    let slot = _parseGOTFromPLT(pltEntry.address);
    let valid = false;
    try {
      valid = slot && slot.readPointer().compare(eglReal) === 0;
    } catch (_) {
    }
    if (!valid) slot = _scanGOT(libgMod, eglReal);
    if (!slot) return false;
    const origFn = new NativeFunction(eglReal, "uint", ["pointer", "pointer"]);
    _hookCb = new NativeCallback(function(dpy, surface) {
      onSwap(dpy, surface);
      return origFn(dpy, surface);
    }, "uint", ["pointer", "pointer"]);
    try {
      Memory.protect(slot, Process.pointerSize, "rw-");
    } catch (_) {
    }
    slot.writePointer(_hookCb);
    return true;
  }
  function hookSwapBuffers(onSwap) {
    if (typeof onSwap === "function") _swapListeners.push(onSwap);
    if (_swapHooked) return true;
    const swapBuffers = findSwapBuffers();
    if (!swapBuffers) return false;
    _swapHooked = patchSwapBuffersGOT(swapBuffers, _dispatchSwap) || attachSwapBuffers(swapBuffers, _dispatchSwap);
    return _swapHooked;
  }

  // ../pc/src/agent/src/helpers/combat.js
  var CASTING_RANGE_SCALE2 = 100;
  var BATTLE_SCREEN_MAX_AGE_MS = 200;
  var FALLBACK_INTERVAL_MS = 1e3;
  var STICKY_RANGE_BUFFER = 200;
  var ERROR_COOLDOWN_MS = 2e3;
  var SKILL_THROTTLE_MS = 1500;
  var MIN_FIRE_GAP_MS = 80;
  var SUPER_SKILL_SLOT = 1;
  var HYPER_COMMAND_TYPE = 17;
  var UNBOUNDED_DISTANCE_SQ = 1e18;
  var MAX_ATTACK_INTERVAL_MS = 1e4;
  var SKILL_KIND_MIN = 2;
  var SKILL_KIND_MAX = 5;
  var SKILL_LINKED_BEHAVIOUR = 3;
  var _attackIntervalByBrawler = /* @__PURE__ */ new Map();
  function setupCombat() {
  }
  function resetCombat() {
    _attackIntervalByBrawler.clear();
  }
  function isImmune(character) {
    const fn = getFunctions().LogicCharacterClient_isImmuneOrUntargetable;
    if (!fn || !character || character.isNull()) return false;
    try {
      return !!fn(character);
    } catch (_) {
      return false;
    }
  }
  function weaponSkillData() {
    try {
      const own = scanData.ownCharacter;
      if (!own || own.isNull()) return null;
      const skill = getFunctions().LogicCharacterClient_getWeaponSkill(own);
      return skill && !skill.isNull() ? skill : null;
    } catch (_) {
      return null;
    }
  }
  function attackIntervalMs() {
    const brawlerId = scanData.myBrawlerId | 0;
    if (_attackIntervalByBrawler.has(brawlerId)) return _attackIntervalByBrawler.get(brawlerId);
    let ms = 0;
    try {
      const skill = weaponSkillData();
      const fn = getFunctions().LogicSkillData_getMsBetweenAttacks;
      if (fn && skill) {
        const value = fn(skill) | 0;
        if (value > 0 && value < MAX_ATTACK_INTERVAL_MS) ms = value;
      }
    } catch (_) {
      ms = 0;
    }
    if (ms <= 0) ms = FALLBACK_INTERVAL_MS;
    if (brawlerId > 0) _attackIntervalByBrawler.set(brawlerId, ms);
    return ms;
  }
  function characterRange(character) {
    try {
      if (!character || character.isNull()) return 0;
      const fns = getFunctions();
      if (!fns.LogicCharacterClient_getWeaponSkill || !fns.LogicSkillData_getCastingRange) return 0;
      const skill = fns.LogicCharacterClient_getWeaponSkill(character);
      if (!skill || skill.isNull()) return 0;
      const tiles = fns.LogicSkillData_getCastingRange(skill) | 0;
      if (tiles <= 0) return 0;
      return tiles * CASTING_RANGE_SCALE2;
    } catch (_) {
      return 0;
    }
  }
  function weaponRange() {
    return characterRange(scanData.ownCharacter);
  }
  function createTargetTracker() {
    let stickyGid = null;
    function reachable(enemy, myX, myY, launcher) {
      if (isImmune(enemy.ptr)) return false;
      return launcher || losCheck(myX, myY, enemy.x, enemy.y, BLOCKS_PROJECTILES);
    }
    return {
      reset() {
        stickyGid = null;
      },
      pick(myX, myY, rangeCheck = true) {
        const range = weaponRange();
        if (range <= 0) return null;
        const rangeSq = rangeCheck ? range * range : UNBOUNDED_DISTANCE_SQ;
        const stickyRange = range + STICKY_RANGE_BUFFER;
        const stickyRangeSq = rangeCheck ? stickyRange * stickyRange : UNBOUNDED_DISTANCE_SQ;
        const launcher = scanData.throwsOverWalls;
        const enemies = scanData.enemies || [];
        let best = null;
        if (stickyGid) {
          for (const enemy of enemies) {
            if (enemy.gid !== stickyGid) continue;
            const dx = enemy.x - myX, dy = enemy.y - myY;
            if (dx * dx + dy * dy < stickyRangeSq && reachable(enemy, myX, myY, launcher)) {
              best = enemy;
            }
            break;
          }
          if (!best) stickyGid = null;
        }
        if (!best) {
          let bestDistanceSq = UNBOUNDED_DISTANCE_SQ;
          for (const enemy of enemies) {
            const dx = enemy.x - myX, dy = enemy.y - myY, distanceSq = dx * dx + dy * dy;
            if (distanceSq >= rangeSq || distanceSq >= bestDistanceSq) continue;
            if (!reachable(enemy, myX, myY, launcher)) continue;
            bestDistanceSq = distanceSq;
            best = enemy;
          }
        }
        if (!best) return null;
        stickyGid = best.gid;
        return {
          gid: best.gid,
          x: best.x,
          y: best.y
        };
      }
    };
  }
  function resolveFirePoint(myX, myY, target, projectileSpeed) {
    const aim = computeAimForTarget(target.gid, myX, myY, projectileSpeed);
    if (aim) return {
      fireX: aim.x,
      fireY: aim.y
    };
    return {
      fireX: target.x,
      fireY: target.y
    };
  }
  function hasWeaponAmmo(own) {
    const fns = getFunctions();
    if (!fns.LogicCharacterClient_getSkillAt || !fns.LogicSkillClient_canActivate || !own || own.isNull()) return true;
    try {
      const skill = fns.LogicCharacterClient_getSkillAt(own, 0);
      if (!skill || skill.isNull()) return true;
      return !!fns.LogicSkillClient_canActivate(skill, ptr(0), own);
    } catch (_) {
      return true;
    }
  }
  function fireAt(battleScreen, own, fireX, fireY, targetGid) {
    const fire = getFunctions().BattleScreen_fireWrapper;
    if (!fire) return false;
    if (!hasWeaponAmmo(own)) return false;
    const gid = parseInt(targetGid, 10);
    if (!isFinite(gid) || gid <= 0) return false;
    try {
      battleScreen.add(offsets.BattleScreen_aimX).writeS32(fireX);
      battleScreen.add(offsets.BattleScreen_aimY).writeS32(fireY);
      battleScreen.add(offsets.BattleScreen_aimTargetId).writeS32(gid);
      fire(battleScreen, own);
      return true;
    } catch (_) {
      return false;
    }
  }
  function skillDataAt(own, slot) {
    const fns = getFunctions();
    if (!fns.LogicCharacterClient_getSkillAt || !fns.LogicSkillClient_getData || !own || own.isNull()) return null;
    try {
      const skill = fns.LogicCharacterClient_getSkillAt(own, slot);
      if (!skill || skill.isNull()) return null;
      const hypercharged = own.add(offsets.LogicCharacterClient_hyperActive).readU8() !== 0 ? 1 : 0;
      let data = fns.LogicSkillClient_getData(skill, hypercharged);
      if (!data || data.isNull()) return null;
      if (fns.LogicSkillData_getBehaviour && fns.LogicSkillData_getLinkedSkill && fns.LogicSkillData_getBehaviour(data) === SKILL_LINKED_BEHAVIOUR) {
        const linked = fns.LogicSkillData_getLinkedSkill(data);
        if (linked && !linked.isNull()) data = linked;
      }
      return data;
    } catch (_) {
      return null;
    }
  }
  function skillProjectileSpeed(data) {
    if (!data || data.isNull()) return 0;
    try {
      const fns = getFunctions();
      const projectile = fns.LogicSkillData_getProjectileData(data, 0);
      if (!projectile || projectile.isNull()) return 0;
      return fns.LogicProjectileData_getSpeed(projectile) | 0;
    } catch (_) {
      return 0;
    }
  }
  function _skillCommandType(data) {
    try {
      const kind = data.add(offsets.LogicSkillData_kind).readS32();
      if (kind < SKILL_KIND_MIN || kind > SKILL_KIND_MAX) return 0;
      return getBase().add(offsets.SkillCommandTypeTable).add((kind - SKILL_KIND_MIN) * 4).readU32();
    } catch (_) {
      return 0;
    }
  }
  function castSkill(data, myX, myY, fireX, fireY) {
    if (!data) return false;
    const commandType = _skillCommandType(data);
    if (!commandType) return false;
    return sendCommand(commandType, (ci) => {
      ci.add(offsets.ClientInput_x).writeS32(fireX - myX | 0);
      ci.add(offsets.ClientInput_y).writeS32(fireY - myY | 0);
      ci.add(offsets.ClientInput_skillData).writePointer(data);
    });
  }
  function activateHypercharge() {
    return sendCommand(HYPER_COMMAND_TYPE, null);
  }

  // ../pc/src/agent/src/features/esp.js
  var SCAN_STALENESS_MS = 2e3;
  var BS_STALENESS_MS = 2e3;
  var RING_SEGS = 32;
  var LINE_THICKNESS = 3;
  var ESP_DEFAULTS = Object.freeze(
    {
      showEnemyBox: true,
      enemyColor: [1, 0.2, 0.2, 0.9],
      enemyColor2: [0.95, 0.2, 0.95, 0.9],
      enemyGradient: false,
      showOwnRange: true,
      ownRangeColor: [0.2, 0.9, 0.95, 0.55],
      ownRangeColor2: [0.95, 0.2, 0.95, 0.55],
      ownRangeGradient: false,
      showEnemyRange: true,
      enemyRangeColor: [0, 0, 0, 0.6],
      enemyRangeColor2: [1, 0.2, 0.2, 0.6],
      enemyRangeGradient: false
    }
  );
  var options2 = {
    showEnemyBox: ESP_DEFAULTS.showEnemyBox,
    enemyColor: ESP_DEFAULTS.enemyColor.slice(),
    enemyColor2: ESP_DEFAULTS.enemyColor2.slice(),
    enemyGradient: ESP_DEFAULTS.enemyGradient,
    showOwnRange: ESP_DEFAULTS.showOwnRange,
    ownRangeColor: ESP_DEFAULTS.ownRangeColor.slice(),
    ownRangeColor2: ESP_DEFAULTS.ownRangeColor2.slice(),
    ownRangeGradient: ESP_DEFAULTS.ownRangeGradient,
    showEnemyRange: ESP_DEFAULTS.showEnemyRange,
    enemyRangeColor: ESP_DEFAULTS.enemyRangeColor.slice(),
    enemyRangeColor2: ESP_DEFAULTS.enemyRangeColor2.slice(),
    enemyRangeGradient: ESP_DEFAULTS.enemyRangeGradient
  };
  var _targetCount = 0;
  var _enemyRingCount = 0;
  var _myRingValid = false;
  var _selfValid = false;
  var _selfX = 0;
  var _selfY = 0;
  var _sw = 0;
  var _sh = 0;
  var _lastUpd = 0;
  var _glReady = false;
  var _glFailed = false;
  var _prog = 0;
  var _posLoc = -1;
  var _colLoc = -1;
  var _vbo = 0;
  var _MAX_VERTS = 2048;
  var _STRIDE_F = 6;
  var _STRIDE_B = 24;
  var _verts = null;
  var vertexBytes = null;
  var vertexBuffer = null;
  var _vertCount = 0;
  var GL_ARRAY_BUFFER = 34962;
  var GL_DYNAMIC_DRAW = 35048;
  var GL_FLOAT = 5126;
  var GL_LINES = 1;
  var GL_BLEND = 3042;
  var GL_SRC_ALPHA = 770;
  var GL_ONE_MINUS_SRC_ALPHA = 771;
  var GL_VERTEX_SHADER = 35633;
  var GL_FRAGMENT_SHADER = 35632;
  var GL_DEPTH_TEST = 2929;
  var GL_CULL_FACE = 2884;
  var GL_SCISSOR_TEST = 3089;
  var _gl = {};
  function _tryLoadGL() {
    const libs = ["libGLESv2.so", "libGLES_mali.so", "libGLES_adreno.so", "libGL.so"];
    for (const lib of libs) {
      try {
        const mod = Process.findModuleByName(lib);
        if (mod && mod.findExportByName("glCreateShader")) return mod;
      } catch (_) {
      }
    }
    return null;
  }
  function _loadGLFunctions(mod) {
    const f = (n, r, a) => new NativeFunction(mod.findExportByName(n), r, a);
    _gl.createShader = f("glCreateShader", "uint", ["uint"]);
    _gl.shaderSource = f("glShaderSource", "void", ["uint", "int", "pointer", "pointer"]);
    _gl.compileShader = f("glCompileShader", "void", ["uint"]);
    _gl.createProgram = f("glCreateProgram", "uint", []);
    _gl.attachShader = f("glAttachShader", "void", ["uint", "uint"]);
    _gl.linkProgram = f("glLinkProgram", "void", ["uint"]);
    _gl.useProgram = f("glUseProgram", "void", ["uint"]);
    _gl.getAttribLoc = f("glGetAttribLocation", "int", ["uint", "pointer"]);
    _gl.getUniformLoc = f("glGetUniformLocation", "int", ["uint", "pointer"]);
    _gl.uniform4f = f("glUniform4f", "void", ["int", "float", "float", "float", "float"]);
    _gl.enableVertexAttrib = f("glEnableVertexAttribArray", "void", ["uint"]);
    _gl.vertexAttribPtr = f("glVertexAttribPointer", "void", ["uint", "int", "uint", "uint8", "int", "pointer"]);
    _gl.drawArrays = f("glDrawArrays", "void", ["uint", "int", "int"]);
    _gl.genBuffers = f("glGenBuffers", "void", ["int", "pointer"]);
    _gl.bindBuffer = f("glBindBuffer", "void", ["uint", "uint"]);
    _gl.bufferData = f("glBufferData", "void", ["uint", "int64", "pointer", "uint"]);
    _gl.enable = f("glEnable", "void", ["uint"]);
    _gl.disable = f("glDisable", "void", ["uint"]);
    _gl.blendFunc = f("glBlendFunc", "void", ["uint", "uint"]);
    _gl.lineWidth = f("glLineWidth", "void", ["float"]);
  }
  var _VERT = "attribute vec2 p;attribute vec4 vc;varying vec4 fc;void main(){fc=vc;gl_Position=vec4(p,0.0,1.0);}";
  var _FRAG = "precision mediump float;varying vec4 fc;void main(){gl_FragColor=fc;}";
  function _initGL() {
    if (_glReady || _glFailed) return;
    try {
      if (!_verts) {
        _verts = new Float32Array(_MAX_VERTS * _STRIDE_F);
        vertexBytes = new Uint8Array(_verts.buffer);
        vertexBuffer = Memory.alloc(_verts.byteLength);
      }
      const lib = _tryLoadGL();
      if (!lib) {
        _glFailed = true;
        logWarn(
          "esp gl init failed",
          {
            reason: "no GLES library"
          }
        );
        try {
          send(
            {
              type: "WARN",
              code: 3,
              text: "esp: no GLES library found, ESP disabled"
            }
          );
        } catch (_) {
        }
        return;
      }
      _loadGLFunctions(lib);
      const mkShader = (type, src) => {
        const s = _gl.createShader(type);
        const sp = Memory.allocUtf8String(src);
        const pp = Memory.alloc(Process.pointerSize);
        pp.writePointer(sp);
        _gl.shaderSource(s, 1, pp, ptr(0));
        _gl.compileShader(s);
        return s;
      };
      const vs = mkShader(GL_VERTEX_SHADER, _VERT);
      const fs = mkShader(GL_FRAGMENT_SHADER, _FRAG);
      _prog = _gl.createProgram();
      if (_prog === 0) {
        _glFailed = true;
        logWarn(
          "esp gl init failed",
          {
            reason: "glCreateProgram 0",
            lib: lib.name
          }
        );
        try {
          send(
            {
              type: "WARN",
              code: 3,
              text: "esp: glCreateProgram returned 0, ESP disabled"
            }
          );
        } catch (_) {
        }
        return;
      }
      _gl.attachShader(_prog, vs);
      _gl.attachShader(_prog, fs);
      _gl.linkProgram(_prog);
      _posLoc = _gl.getAttribLoc(_prog, Memory.allocUtf8String("p"));
      _colLoc = _gl.getAttribLoc(_prog, Memory.allocUtf8String("vc"));
      const vp = Memory.alloc(4);
      _gl.genBuffers(1, vp);
      _vbo = vp.readU32();
      _glReady = true;
      logInfo(
        "esp overlay ready",
        {
          lib: lib.name,
          vbo: _vbo,
          posLoc: _posLoc,
          colLoc: _colLoc
        }
      );
    } catch (e) {
      _glFailed = true;
      try {
        send(
          {
            type: "WARN",
            code: 3,
            text: "esp: init error: " + (e && e.message ? e.message : e)
          }
        );
      } catch (_) {
      }
    }
  }
  function _setVert(idx, nx, ny, r, g, b, a) {
    const off2 = idx * _STRIDE_F;
    _verts[off2] = nx;
    _verts[off2 + 1] = ny;
    _verts[off2 + 2] = r;
    _verts[off2 + 3] = g;
    _verts[off2 + 4] = b;
    _verts[off2 + 5] = a;
  }
  function _pushSeg(idx, ax, ay, bx, by, r, g, b_, a) {
    if (idx + 2 > _MAX_VERTS) return idx;
    _setVert(idx, ax, ay, r, g, b_, a);
    _setVert(idx + 1, bx, by, r, g, b_, a);
    return idx + 2;
  }
  function _pushSegGrad(idx, ax, ay, bx, by, ra, ga, ba, aa, rb, gb, bb, ab) {
    if (idx + 2 > _MAX_VERTS) return idx;
    _setVert(idx, ax, ay, ra, ga, ba, aa);
    _setVert(idx + 1, bx, by, rb, gb, bb, ab);
    return idx + 2;
  }
  function _pushBox(idx, sx, sy, r, g, b, a) {
    const nx = sx / _sw * 2 - 1;
    const ny = 1 - sy / _sh * 2;
    const bw = 80 / _sw, bh = 120 / _sh;
    const x0 = nx - bw / 2, x1 = nx + bw / 2;
    idx = _pushSeg(idx, x0, ny, x1, ny, r, g, b, a);
    idx = _pushSeg(idx, x1, ny, x1, ny + bh, r, g, b, a);
    idx = _pushSeg(idx, x1, ny + bh, x0, ny + bh, r, g, b, a);
    idx = _pushSeg(idx, x0, ny + bh, x0, ny, r, g, b, a);
    return idx;
  }
  function _pushBoxGrad(idx, sx, sy, ra, ga, ba, aa, rb, gb, bb, ab) {
    const nx = sx / _sw * 2 - 1;
    const ny = 1 - sy / _sh * 2;
    const bw = 80 / _sw, bh = 120 / _sh;
    const x0 = nx - bw / 2, x1 = nx + bw / 2;
    const y0 = ny, y1 = ny + bh;
    const dr = rb - ra, dg = gb - ga, db = bb - ba, da_ = ab - aa;
    const t1 = 0.25, t2 = 0.5, t3 = 0.75;
    const r1 = ra + dr * t1, g1 = ga + dg * t1, b1 = ba + db * t1, a1 = aa + da_ * t1;
    const r2 = ra + dr * t2, g2 = ga + dg * t2, b2 = ba + db * t2, a2 = aa + da_ * t2;
    const r3 = ra + dr * t3, g3 = ga + dg * t3, b3 = ba + db * t3, a3 = aa + da_ * t3;
    idx = _pushSegGrad(idx, x0, y0, x1, y0, ra, ga, ba, aa, r1, g1, b1, a1);
    idx = _pushSegGrad(idx, x1, y0, x1, y1, r1, g1, b1, a1, r2, g2, b2, a2);
    idx = _pushSegGrad(idx, x1, y1, x0, y1, r2, g2, b2, a2, r3, g3, b3, a3);
    idx = _pushSegGrad(idx, x0, y1, x0, y0, r3, g3, b3, a3, ra, ga, ba, aa);
    return idx;
  }
  function _pushRing(idx, pts, r, g, b, a) {
    const n = RING_SEGS;
    for (let i = 0; i < n; i++) {
      const p1 = pts[i], p2 = pts[(i + 1) % n];
      if (!p1.valid || !p2.valid) continue;
      const ax = p1.sx / _sw * 2 - 1, ay = 1 - p1.sy / _sh * 2;
      const bx = p2.sx / _sw * 2 - 1, by_ = 1 - p2.sy / _sh * 2;
      idx = _pushSeg(idx, ax, ay, bx, by_, r, g, b, a);
    }
    return idx;
  }
  function _pushRingGrad(idx, pts, ra, ga, ba, aa, rb, gb, bb, ab) {
    const n = RING_SEGS;
    const dr = rb - ra, dg = gb - ga, db = bb - ba, da_ = ab - aa;
    const inv = 1 / n;
    for (let i = 0; i < n; i++) {
      const p1 = pts[i], p2 = pts[(i + 1) % n];
      if (!p1.valid || !p2.valid) continue;
      const t1 = i * inv;
      const t2 = (i + 1) * inv;
      const ax = p1.sx / _sw * 2 - 1, ay = 1 - p1.sy / _sh * 2;
      const bx = p2.sx / _sw * 2 - 1, by_ = 1 - p2.sy / _sh * 2;
      idx = _pushSegGrad(
        idx,
        ax,
        ay,
        bx,
        by_,
        ra + dr * t1,
        ga + dg * t1,
        ba + db * t1,
        aa + da_ * t1,
        ra + dr * t2,
        ga + dg * t2,
        ba + db * t2,
        aa + da_ * t2
      );
    }
    return idx;
  }
  function _drawFrame() {
    if (!_glReady || _sw <= 0 || _sh <= 0) return;
    if (_lastUpd > 0 && Date.now() - _lastUpd > 1500) {
      _targetCount = 0;
      _enemyRingCount = 0;
      _myRingValid = false;
      _selfValid = false;
    }
    if (_targetCount === 0 && !_myRingValid && _enemyRingCount === 0) return;
    try {
      let idx = 0;
      if (options2.showEnemyRange) {
        const erc = options2.enemyRangeColor;
        const erc2 = options2.enemyRangeColor2;
        const erg = options2.enemyRangeGradient;
        for (let i = 0; i < _enemyRingCount; i++) {
          if (erg) {
            idx = _pushRingGrad(
              idx,
              _ringPools[i],
              erc[0],
              erc[1],
              erc[2],
              erc[3],
              erc2[0],
              erc2[1],
              erc2[2],
              erc2[3]
            );
          } else {
            idx = _pushRing(idx, _ringPools[i], erc[0], erc[1], erc[2], erc[3]);
          }
        }
      }
      if (options2.showOwnRange && _myRingValid) {
        const orc = options2.ownRangeColor;
        const orc2 = options2.ownRangeColor2;
        if (options2.ownRangeGradient) {
          idx = _pushRingGrad(
            idx,
            _myRingPool,
            orc[0],
            orc[1],
            orc[2],
            orc[3],
            orc2[0],
            orc2[1],
            orc2[2],
            orc2[3]
          );
        } else {
          idx = _pushRing(idx, _myRingPool, orc[0], orc[1], orc[2], orc[3]);
        }
      }
      const ox = _selfValid ? _selfX / _sw * 2 - 1 : 0;
      const oy = _selfValid ? 1 - _selfY / _sh * 2 : 0;
      const ec = options2.enemyColor;
      const e2 = options2.enemyColor2;
      const grad = options2.enemyGradient;
      for (let i = 0; i < _targetCount; i++) {
        const t = _targetsPool[i];
        if (options2.showEnemyBox) {
          if (t.los && _selfValid) {
            const tx = t.sx / _sw * 2 - 1;
            const ty = 1 - t.sy / _sh * 2;
            if (grad) {
              idx = _pushSegGrad(
                idx,
                ox,
                oy,
                tx,
                ty,
                ec[0],
                ec[1],
                ec[2],
                ec[3],
                e2[0],
                e2[1],
                e2[2],
                e2[3]
              );
            } else {
              idx = _pushSeg(idx, ox, oy, tx, ty, ec[0], ec[1], ec[2], ec[3]);
            }
          }
          if (grad) {
            idx = _pushBoxGrad(
              idx,
              t.sx,
              t.sy,
              ec[0],
              ec[1],
              ec[2],
              ec[3],
              e2[0],
              e2[1],
              e2[2],
              e2[3]
            );
          } else {
            idx = _pushBox(idx, t.sx, t.sy, ec[0], ec[1], ec[2], ec[3]);
          }
        }
      }
      if (idx === 0) return;
      _vertCount = idx;
      vertexBuffer.writeByteArray(vertexBytes.subarray(0, _vertCount * _STRIDE_B));
      _gl.disable(GL_DEPTH_TEST);
      _gl.disable(GL_CULL_FACE);
      _gl.disable(GL_SCISSOR_TEST);
      _gl.enable(GL_BLEND);
      _gl.blendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
      _gl.useProgram(_prog);
      _gl.bindBuffer(GL_ARRAY_BUFFER, _vbo);
      _gl.bufferData(GL_ARRAY_BUFFER, _vertCount * _STRIDE_B, vertexBuffer, GL_DYNAMIC_DRAW);
      _gl.enableVertexAttrib(_posLoc);
      _gl.vertexAttribPtr(_posLoc, 2, GL_FLOAT, 0, _STRIDE_B, ptr(0));
      _gl.enableVertexAttrib(_colLoc);
      _gl.vertexAttribPtr(_colLoc, 4, GL_FLOAT, 0, _STRIDE_B, ptr(8));
      _gl.lineWidth(LINE_THICKNESS);
      _gl.drawArrays(GL_LINES, 0, _vertCount);
      _gl.useProgram(0);
      _gl.bindBuffer(GL_ARRAY_BUFFER, 0);
    } catch (_) {
      _glFailed = true;
    }
  }
  var _mSW = 0;
  var _mSH = 0;
  var _mMat = new Float32Array(16);
  var _ringCos = new Float32Array(RING_SEGS);
  var _ringSin = new Float32Array(RING_SEGS);
  (function() {
    for (let i = 0; i < RING_SEGS; i++) {
      const a = i * (Math.PI * 2 / RING_SEGS);
      _ringCos[i] = Math.cos(a);
      _ringSin[i] = Math.sin(a);
    }
  })();
  var _MAX_RINGS = 8;
  var _ringPools = new Array(_MAX_RINGS);
  for (let i = 0; i < _MAX_RINGS; i++) {
    const r = new Array(RING_SEGS);
    for (let j = 0; j < RING_SEGS; j++) r[j] = {
      sx: 0,
      sy: 0,
      valid: false
    };
    _ringPools[i] = r;
  }
  var _myRingPool = new Array(RING_SEGS);
  for (let i = 0; i < RING_SEGS; i++) _myRingPool[i] = {
    sx: 0,
    sy: 0,
    valid: false
  };
  var _targetsPool = new Array(_MAX_RINGS);
  for (let i = 0; i < _MAX_RINGS; i++) _targetsPool[i] = {
    sx: 0,
    sy: 0,
    los: false
  };
  var _w2sTmp = {
    sx: 0,
    sy: 0,
    valid: false
  };
  function _refreshMatrix(bs) {
    try {
      _mSW = bs.add(offsets.BattleScreen_screenWidth).readFloat();
      _mSH = bs.add(offsets.BattleScreen_screenHeight).readFloat();
      if (_mSW <= 0 || _mSH <= 0) return false;
      const buf = bs.add(offsets.BattleScreen_viewMatrix).readByteArray(64);
      if (!buf) return false;
      const dv = new DataView(buf);
      for (let i = 0; i < 16; i++) _mMat[i] = dv.getFloat32(i * 4, true);
      return true;
    } catch (_) {
      return false;
    }
  }
  function _w2sInto(wx, wy, out) {
    const M = _mMat;
    const y = -wy;
    const cx = M[0] * wx + M[4] * y + M[12];
    const cy = M[1] * wx + M[5] * y + M[13];
    const cw = M[3] * wx + M[7] * y + M[15];
    if (cw <= 1e-6) {
      out.valid = false;
      return false;
    }
    const iw = 1 / cw;
    out.sx = (cx * iw * 0.5 + 0.5) * _mSW;
    out.sy = (1 - (cy * iw * 0.5 + 0.5)) * _mSH;
    out.valid = true;
    return true;
  }
  var _hookInstalled = false;
  var _espBase = null;
  var _hookRetryTimer = null;
  var ESP_HOOK_RETRY_MS = 250;
  function _renderOverlay() {
    try {
      if (!state.esp) return;
      if (!_glReady && !_glFailed) _initGL();
      _drawFrame();
    } catch (_) {
    }
  }
  function _scheduleHookRetry() {
    if (_hookRetryTimer !== null || _hookInstalled || !state.esp || !_espBase) return;
    _hookRetryTimer = setTimeout(() => {
      _hookRetryTimer = null;
      if (state.esp && !_hookInstalled && _espBase) setupESP(_espBase);
    }, ESP_HOOK_RETRY_MS);
  }
  function setupESP(base2) {
    _espBase = base2;
    if (!state.esp || _hookInstalled) return;
    try {
      if (hookSwapBuffers(_renderOverlay)) {
        _hookInstalled = true;
        return;
      }
    } catch (_) {
    }
    _scheduleHookRetry();
  }
  function _ringPointsInto(cx, cy, r, pool) {
    for (let i = 0; i < RING_SEGS; i++) {
      _w2sInto(cx + _ringCos[i] * r, cy + _ringSin[i] * r, pool[i]);
    }
  }
  function updateESP() {
    const now = Date.now();
    const battleScreen = getBattleScreen();
    const battleScreenTs = getBattleScreenTs();
    if (!battleScreen || battleScreen.isNull() || battleScreenTs > 0 && now - battleScreenTs > BS_STALENESS_MS || scanData.lastUpdate === 0 || now - scanData.lastUpdate > SCAN_STALENESS_MS || !scanData.ownCharacter || scanData.myX === void 0 || scanData.myX === -1) {
      _targetCount = 0;
      _enemyRingCount = 0;
      _myRingValid = false;
      _selfValid = false;
      return;
    }
    if (!_refreshMatrix(battleScreen)) {
      _targetCount = 0;
      _enemyRingCount = 0;
      _myRingValid = false;
      _selfValid = false;
      return;
    }
    _sw = _mSW;
    _sh = _mSH;
    const mx = scanData.myX, my = scanData.myY;
    _selfValid = _w2sInto(mx, my, _w2sTmp);
    if (_selfValid) {
      _selfX = _w2sTmp.sx;
      _selfY = _w2sTmp.sy;
    }
    const myRange = characterRange(scanData.ownCharacter);
    if (myRange > 0) {
      _ringPointsInto(mx, my, myRange, _myRingPool);
      _myRingValid = true;
    } else {
      _myRingValid = false;
    }
    const enemies = scanData.enemies;
    let tCount = 0;
    let rCount = 0;
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      if (!e || e.x === -1 || e.y === -1) continue;
      if (tCount >= _MAX_RINGS) break;
      if (!_w2sInto(e.x, e.y, _w2sTmp)) continue;
      const slot = _targetsPool[tCount];
      slot.sx = _w2sTmp.sx;
      slot.sy = _w2sTmp.sy;
      slot.los = losCheck(mx, my, e.x, e.y, BLOCKS_PROJECTILES);
      tCount++;
      const eR = characterRange(e.ptr);
      if (eR <= 0) continue;
      _ringPointsInto(e.x, e.y, eR, _ringPools[rCount]);
      rCount++;
    }
    _targetCount = tCount;
    _enemyRingCount = rCount;
    _lastUpd = now;
    logEvery(
      90,
      "esp tick",
      {
        enemies: enemies.length,
        drawn: tCount,
        rings: rCount,
        self: _selfValid,
        sw: _sw | 0,
        sh: _sh | 0
      }
    );
  }
  function resetESP() {
    _targetCount = 0;
    _enemyRingCount = 0;
    _myRingValid = false;
    _selfValid = false;
    _sw = 0;
    _sh = 0;
    _lastUpd = 0;
  }

  // ../pc/src/agent/src/features/fps.js
  var SAMPLE_WINDOW_MS = 1e3;
  var EMIT_MS = 250;
  var DEFAULT_POS_X = 570;
  var DEFAULT_POS_Y = 80;
  var LABEL_SCALE = 1.4;
  var SC_FILE = "sc/ui.sc";
  var SC_EXPORT = "damage_number";
  var TEXT_FIELD = "txt";
  var CONTAINER_SIZE = 208;
  var _base3 = null;
  var _isResourceLoaded = null;
  var _containerCtor = null;
  var _getTextFieldByName = null;
  var _stageAddChild = null;
  var _setText = null;
  var _fileName = null;
  var _textFieldName = null;
  var _container = null;
  var _textField = null;
  var _posX = DEFAULT_POS_X;
  var _posY = DEFAULT_POS_Y;
  var _lastText = null;
  var _wasOn = false;
  var _samples = [];
  var _lastEmit = 0;
  function _stage() {
    try {
      const stage = _base3.add(offsets.StageInstanceGlobalPtr).readPointer();
      return stage && !stage.isNull() ? stage : null;
    } catch (_) {
      return null;
    }
  }
  function _build() {
    const stage = _stage();
    if (!stage) return false;
    const resource = _isResourceLoaded(_fileName, 0);
    if (!resource || resource.isNull()) return false;
    const container = getFunctions().operator_new(CONTAINER_SIZE);
    if (!container || container.isNull()) return false;
    withScString(SC_FILE, (file) => withScString(SC_EXPORT, (exportName) => _containerCtor(container, file, exportName)));
    const movieClip = container.add(offsets.DropGUIContainer_movieClip).readPointer();
    if (!movieClip || movieClip.isNull()) return false;
    const textField = _getTextFieldByName(movieClip, _textFieldName);
    if (!textField || textField.isNull()) return false;
    movieClip.add(offsets.DisplayObject_visible).writeU8(1);
    container.add(offsets.DisplayObject_scaleX).writeFloat(LABEL_SCALE);
    container.add(offsets.DisplayObject_scaleY).writeFloat(LABEL_SCALE);
    _stageAddChild(stage, container);
    _container = container;
    _textField = textField;
    _lastText = null;
    logInfo(
      "fps label attached",
      {
        x: _posX | 0,
        y: _posY | 0
      }
    );
    return true;
  }
  function _show(text) {
    if (!_container && !_build()) {
      logEvery(90, "fps label wait");
      return;
    }
    _container.add(offsets.DisplayObject_x).writeFloat(_posX);
    _container.add(offsets.DisplayObject_y).writeFloat(_posY);
    _container.add(offsets.DisplayObject_visible).writeU8(1);
    if (text === _lastText) return;
    withScString(text, (sc) => _setText(_textField, sc));
    _lastText = text;
  }
  function _hide() {
    if (!_container) return;
    _container.add(offsets.DisplayObject_visible).writeU8(0);
    if (_lastText !== null) logInfo("fps hidden");
    _lastText = null;
  }
  function setupFps(base2) {
    if (_containerCtor) return;
    _base3 = base2;
    const fns = getFunctions();
    _isResourceLoaded = fns.ResourceManager_isResourceLoaded;
    _containerCtor = fns.DropGUIContainer_ctorFromExport;
    _getTextFieldByName = fns.MovieClip_getTextFieldByName;
    _stageAddChild = fns.Stage_addChild;
    _setText = fns.TextField_setText;
    _fileName = Memory.allocUtf8String(SC_FILE);
    _textFieldName = Memory.allocUtf8String(TEXT_FIELD);
    Interceptor.attach(
      base2.add(offsets.GameMain__update),
      {
        onEnter() {
          try {
            if (!state.fps) {
              if (_wasOn) {
                _wasOn = false;
                _samples.length = 0;
                _lastEmit = 0;
                _hide();
              }
              return;
            }
            const now = Date.now();
            if (!_wasOn) {
              _wasOn = true;
              _samples.length = 0;
              _lastEmit = now;
              logInfo(
                "fps shown",
                {
                  x: _posX | 0,
                  y: _posY | 0
                }
              );
            }
            _samples.push(now);
            while (_samples.length && now - _samples[0] > SAMPLE_WINDOW_MS) _samples.shift();
            if (now - _lastEmit < EMIT_MS) return;
            _lastEmit = now;
            const fps = _samples.length | 0;
            _show("FPS: " + fps);
            logEvery(
              60,
              "fps sample",
              {
                fps,
                x: _posX | 0,
                y: _posY | 0
              }
            );
          } catch (_) {
          }
        }
      }
    );
  }
  function resetFps() {
    _samples.length = 0;
    _lastEmit = 0;
    _wasOn = false;
    _hide();
  }

  // ../pc/src/agent/src/features/gradient.js
  var GRADIENT_CSV = "csv_client/color_gradients.csv";
  var MAX_GRADIENT_ROWS = 512;
  var DECORATED_MARKER = 726355;
  var MAX_WALK_NODES = 8192;
  var MAX_WALK_DEPTH = 16;
  var MAX_TRACKED_FIELDS = 128;
  var MAX_NAME_FIELDS = 16;
  var NAME_ISOLATE_PREFIX = "\u2068";
  var _base4 = null;
  var _setupDecorated = null;
  var _gradients = /* @__PURE__ */ new Map();
  var _names = [];
  var _tracked = /* @__PURE__ */ new Map();
  var _nameFields = /* @__PURE__ */ new Set();
  var _pending2 = [];
  var _selectedName = "";
  var _inReapply = false;
  function _isDecoratedField(field) {
    try {
      if (!field.readPointer().equals(_base4.add(offsets.VTABLE_DECORATED_TEXT_FIELD))) return false;
      return field.add(offsets.DecoratedTextField_marker).readU32() === DECORATED_MARKER;
    } catch (_) {
      return false;
    }
  }
  function _fieldGradient(field) {
    try {
      return field.add(offsets.DecoratedTextField_gradient).readPointer();
    } catch (_) {
      return NULL;
    }
  }
  function _fieldText(field) {
    try {
      return readScString(field.add(offsets.DecoratedTextField_text));
    } catch (_) {
      return null;
    }
  }
  function _track(field, gradient) {
    if (_tracked.size >= MAX_TRACKED_FIELDS) return;
    const key = field.toString();
    if (_tracked.has(key) || !_isDecoratedField(field)) return;
    _tracked.set(key, gradient || NULL);
  }
  function _collectDecorated() {
    const found = [];
    let stage;
    try {
      stage = _base4.add(offsets.StageInstanceGlobalPtr).readPointer();
      if (!stage || stage.isNull()) return found;
    } catch (_) {
      return found;
    }
    const queue = [
      {
        node: stage.add(offsets.Stage_spriteContainer).readPointer(),
        depth: 0
      }
    ];
    let visited = 0;
    while (queue.length && visited < MAX_WALK_NODES) {
      const {
        node,
        depth
      } = queue.shift();
      if (!node || node.isNull() || depth > MAX_WALK_DEPTH) continue;
      visited++;
      if (_isDecoratedField(node)) found.push(node);
      try {
        const count = node.add(offsets.Sprite_childCount).readU16();
        if (count === 0 || count > 512) continue;
        const children = node.add(offsets.Sprite_childArray).readPointer();
        if (!children || children.isNull()) continue;
        for (let i = 0; i < count; i++) {
          queue.push(
            {
              node: children.add(i * Process.pointerSize).readPointer(),
              depth: depth + 1
            }
          );
        }
      } catch (_) {
      }
    }
    return found;
  }
  function _trackVisibleFields() {
    for (const field of _collectDecorated()) _track(field, _fieldGradient(field));
  }
  function _catalogNames() {
    const table = loadCSV(GRADIENT_CSV);
    if (!table) return [];
    const count = table.getRowCount();
    if (count <= 0 || count > MAX_GRADIENT_ROWS) return [];
    const names = [];
    for (let i = 0; i < count; i++) {
      const row = table.getRowAt(i);
      if (!row) continue;
      const name = row.getName();
      if (name) names.push(name);
    }
    return names;
  }
  function _ensureDiscovered() {
    if (_gradients.size > 0) return;
    if (_names.length === 0) _names = _catalogNames();
    if (_names.length === 0 || !_base4) return;
    const table = getDataTable(offsets.GRADIENT_TABLE_INDEX);
    if (!table) {
      logInfo("gradient table not ready");
      return;
    }
    for (const name of _names) {
      const item = findDataByName(table, name);
      if (item) _gradients.set(name, item);
    }
    logInfo(
      "gradient table read",
      {
        names: _names.length,
        resolved: _gradients.size
      }
    );
  }
  function _decorate(field, gradient) {
    const text = _fieldText(field);
    if (text === null) return null;
    _inReapply = true;
    try {
      return withScString(text, (scText) => _setupDecorated(field, scText, gradient));
    } finally {
      _inReapply = false;
    }
  }
  function _isPlainTextField(field) {
    try {
      return field.readPointer().equals(_base4.add(offsets.VTABLE_TEXT_FIELD));
    } catch (_) {
      return false;
    }
  }
  function _hasMovieClipParent(field) {
    try {
      const parent = field.add(offsets.DisplayObject_parent).readPointer();
      if (parent.isNull()) return false;
      const predicate = parent.readPointer().add(offsets.DisplayObject_isMovieClipSlot).readPointer();
      return new NativeFunction(predicate, "int", ["pointer"])(parent) !== 0;
    } catch (_) {
      return false;
    }
  }
  function _rememberNameField(field) {
    const key = field.toString();
    if (_nameFields.has(key)) return;
    if (_nameFields.size >= MAX_NAME_FIELDS) {
      for (const known of _nameFields) {
        if (!_isPlainTextField(ptr(known)) && !_isDecoratedField(ptr(known))) _nameFields.delete(known);
      }
      if (_nameFields.size >= MAX_NAME_FIELDS) return;
    }
    _nameFields.add(key);
    _pending2.push(key);
  }
  function _hideDuplicateNames(parent, keep, text) {
    try {
      const count = parent.add(offsets.Sprite_childCount).readU16();
      if (count === 0 || count > 512) return;
      const children = parent.add(offsets.Sprite_childArray).readPointer();
      if (children.isNull()) return;
      for (let i = 0; i < count; i++) {
        const child = children.add(i * Process.pointerSize).readPointer();
        if (child.equals(keep) || !_isDecoratedField(child) || _fieldText(child) !== text) continue;
        child.add(offsets.DisplayObject_visible).writeU8(0);
        _tracked.delete(child.toString());
        _nameFields.delete(child.toString());
      }
    } catch (_) {
    }
  }
  function _convertNameField(field) {
    if (_isDecoratedField(field)) {
      _track(field, NULL);
      return;
    }
    const gradient = _selectedGradient();
    if (!gradient || !_isPlainTextField(field) || !_hasMovieClipParent(field)) return;
    const parent = field.add(offsets.DisplayObject_parent).readPointer();
    const text = _fieldText(field);
    const decorated = _decorate(field, gradient);
    if (!decorated || decorated.isNull()) return;
    _hideDuplicateNames(parent, decorated, text);
    _nameFields.delete(field.toString());
    _nameFields.add(decorated.toString());
    _track(decorated, NULL);
  }
  function _drainPending(currentField) {
    if (_pending2.length === 0) return;
    const current = currentField.toString();
    for (let i = _pending2.length - 1; i >= 0; i--) {
      const key = _pending2[i];
      if (key === current) continue;
      _pending2.splice(i, 1);
      _convertNameField(ptr(key));
    }
  }
  function _selectedGradient() {
    if (!state.gradient) return null;
    return _gradients.get(_selectedName) || null;
  }
  function listGradients() {
    _ensureDiscovered();
    return _names.slice();
  }
  function setGradientOptions(o) {
    if (!o || typeof o !== "object" || typeof o.name !== "string") return;
    _selectedName = o.name;
    _ensureDiscovered();
    logInfo(
      "gradient selected",
      {
        requested: o.name,
        known: _gradients.size,
        catalog: _names.length
      }
    );
    applyGradientAll();
  }
  function applyGradientAll() {
    if (!_setupDecorated || _inReapply) return;
    if (state.gradient) _ensureDiscovered();
    if (_tracked.size === 0) _trackVisibleFields();
    for (const key of _nameFields) {
      if (_pending2.indexOf(key) === -1) _pending2.push(key);
    }
    const gradient = _selectedGradient();
    for (const [key, original] of _tracked) {
      const field = ptr(key);
      if (!_isDecoratedField(field)) {
        _tracked.delete(key);
        continue;
      }
      const wanted = gradient || original;
      if (_fieldGradient(field).equals(wanted)) continue;
      _decorate(field, wanted);
    }
  }
  function resetGradient() {
    _tracked.clear();
    _nameFields.clear();
    _pending2.length = 0;
  }
  function setupGradient(base2) {
    if (_setupDecorated) return;
    _base4 = base2;
    _setupDecorated = getFunctions().Name_setupDecorated;
    Interceptor.attach(
      base2.add(offsets.Name_applyDecoration),
      {
        onEnter(args) {
          if (_inReapply) return;
          _track(args[0], args[2]);
          const gradient = _selectedGradient();
          if (gradient) args[2] = gradient;
        }
      }
    );
    Interceptor.attach(
      base2.add(offsets.TextField_setText),
      {
        onEnter(args) {
          if (_inReapply) return;
          _drainPending(args[0]);
          let text;
          try {
            text = readScString(args[1]);
          } catch (_) {
            return;
          }
          if (text === null || text.charAt(0) !== NAME_ISOLATE_PREFIX) return;
          _rememberNameField(args[0]);
        }
      }
    );
  }

  // ../pc/src/agent/src/features/holdshoot.js
  var STALE_SCAN_MS = 500;
  var options3 = {
    aim: true,
    rangeCheck: true,
    useUlti: false
  };
  var targets = createTargetTracker();
  var errorUntil = 0;
  var lastAttackMs = 0;
  var lastSuperMs = 0;
  var previousUltiHeld = 0;
  function resetHoldShoot() {
    targets.reset();
    lastAttackMs = 0;
    lastSuperMs = 0;
    previousUltiHeld = 0;
  }
  function aimPoint(myX, myY, target, projectileSpeed) {
    if (options3.aim) return resolveFirePoint(myX, myY, target, projectileSpeed);
    return {
      fireX: target.x,
      fireY: target.y
    };
  }
  function updateHoldShoot(now) {
    if (!state.holdshoot) return;
    if (!scanData.battleModeClient || scanData.battleModeClient.isNull()) return;
    const battleScreen = getBattleScreen();
    if (!battleScreen) return;
    if (now === void 0) now = Date.now();
    if (now < errorUntil) return;
    if (now - scanData.lastUpdate > STALE_SCAN_MS) return;
    if (now - getBattleScreenTs() > BATTLE_SCREEN_MAX_AGE_MS) return;
    if (scanData.hasCarryable) return;
    let attackHeld = 0, ultiHeld = 0;
    try {
      ultiHeld = battleScreen.add(offsets.BattleScreen_ultiJoyHeld).readU8();
      if (!ultiHeld) {
        attackHeld = battleScreen.add(offsets.BattleScreen_autoFireBtnHeld).readU8() | battleScreen.add(offsets.BattleScreen_attackJoyHeld).readU8();
      }
    } catch (_) {
      previousUltiHeld = 0;
      return;
    }
    const ultiRising = ultiHeld && !previousUltiHeld;
    previousUltiHeld = ultiHeld;
    if (!attackHeld && !ultiRising) return;
    try {
      const own = scanData.ownCharacter;
      if (!own || own.isNull()) return;
      const myX = scanData.myX, myY = scanData.myY;
      const target = targets.pick(myX, myY, options3.rangeCheck);
      if (!target) return;
      if (attackHeld) {
        const interval = Math.max(MIN_FIRE_GAP_MS, attackIntervalMs());
        if (now - lastAttackMs >= interval) {
          const fire = aimPoint(myX, myY, target, 0);
          if (fireAt(battleScreen, own, fire.fireX, fire.fireY, target.gid)) {
            lastAttackMs = now;
            logEvery(
              20,
              "holdshoot attack",
              {
                id: target.gid,
                x: fire.fireX | 0,
                y: fire.fireY | 0,
                myX: myX | 0,
                myY: myY | 0,
                dist: Math.hypot(fire.fireX - myX, fire.fireY - myY) | 0
              }
            );
          }
        }
      }
      if (ultiRising && options3.useUlti && now - lastSuperMs >= SKILL_THROTTLE_MS) {
        lastSuperMs = now;
        const data = skillDataAt(own, SUPER_SKILL_SLOT);
        const fire = aimPoint(myX, myY, target, skillProjectileSpeed(data));
        logInfo(
          "holdshoot super",
          {
            id: target.gid,
            x: fire.fireX | 0,
            y: fire.fireY | 0,
            myX: myX | 0,
            myY: myY | 0,
            dist: Math.hypot(fire.fireX - myX, fire.fireY - myY) | 0,
            resolved: !!data
          }
        );
        castSkill(data, myX, myY, fire.fireX, fire.fireY);
      }
    } catch (e) {
      errorUntil = Date.now() + ERROR_COOLDOWN_MS;
      logError(
        "holdshoot tick failed",
        {
          err: String(e && e.message || e)
        }
      );
    }
  }

  // ../pc/src/agent/src/features/killaura.js
  var STALE_SCAN_MS2 = 500;
  var options4 = {
    useAttack: true,
    useSuper: false,
    useHyper: false
  };
  var superBrawlers = /* @__PURE__ */ new Set();
  var targets2 = createTargetTracker();
  var errorUntil2 = 0;
  var lastAttackMs2 = 0;
  var lastSuperMs2 = 0;
  var lastHyperMs = 0;
  function resetKillaura() {
    targets2.reset();
    lastAttackMs2 = 0;
    lastSuperMs2 = 0;
    lastHyperMs = 0;
  }
  function superAllowed(name) {
    if (superBrawlers.size === 0) return true;
    return !!name && superBrawlers.has(name);
  }
  function updateKillaura(now) {
    if (!state.killaura) return;
    if (!options4.useAttack && !options4.useSuper && !options4.useHyper) return;
    const battleScreen = getBattleScreen();
    if (!battleScreen) return;
    if (now === void 0) now = Date.now();
    if (now < errorUntil2) return;
    if (now - scanData.lastUpdate > STALE_SCAN_MS2) return;
    if (now - getBattleScreenTs() > BATTLE_SCREEN_MAX_AGE_MS) return;
    if (scanData.hasCarryable) return;
    try {
      const own = scanData.ownCharacter;
      if (!own || own.isNull()) return;
      const myX = scanData.myX, myY = scanData.myY;
      const target = targets2.pick(myX, myY);
      if (!target) return;
      if (options4.useAttack && now - lastAttackMs2 >= attackIntervalMs()) {
        const fire = resolveFirePoint(myX, myY, target, 0);
        if (fireAt(battleScreen, own, fire.fireX, fire.fireY, target.gid)) {
          lastAttackMs2 = now;
          logEvery(
            20,
            "killaura attack",
            {
              id: target.gid,
              x: fire.fireX | 0,
              y: fire.fireY | 0,
              myX: myX | 0,
              myY: myY | 0,
              dist: Math.hypot(fire.fireX - myX, fire.fireY - myY) | 0,
              brawler: scanData.myBrawlerName || ""
            }
          );
        }
      }
      if (options4.useSuper && now - lastSuperMs2 >= SKILL_THROTTLE_MS && superAllowed(scanData.myBrawlerName)) {
        lastSuperMs2 = now;
        const data = skillDataAt(own, SUPER_SKILL_SLOT);
        const fire = resolveFirePoint(myX, myY, target, skillProjectileSpeed(data));
        logInfo(
          "killaura super",
          {
            id: target.gid,
            x: fire.fireX | 0,
            y: fire.fireY | 0,
            myX: myX | 0,
            myY: myY | 0,
            dist: Math.hypot(fire.fireX - myX, fire.fireY - myY) | 0,
            resolved: !!data,
            brawler: scanData.myBrawlerName || ""
          }
        );
        castSkill(data, myX, myY, fire.fireX, fire.fireY);
      }
      if (options4.useHyper && now - lastHyperMs >= SKILL_THROTTLE_MS) {
        lastHyperMs = now;
        logInfo(
          "killaura hypercharge",
          {
            id: target.gid,
            x: target.x | 0,
            y: target.y | 0,
            myX: myX | 0,
            myY: myY | 0,
            dist: Math.hypot(target.x - myX, target.y - myY) | 0,
            brawler: scanData.myBrawlerName || ""
          }
        );
        activateHypercharge();
      }
    } catch (e) {
      errorUntil2 = Date.now() + ERROR_COOLDOWN_MS;
      logError(
        "killaura tick failed",
        {
          err: String(e && e.message || e)
        }
      );
    }
  }

  // ../pc/src/agent/src/features/pin.js
  var EMPTY_PIN_ID = 0;
  var _opts3 = {
    intervalMs: 800
  };
  var _lastFire = 0;
  var _sendPin = null;
  function resetPin() {
    _lastFire = 0;
  }
  function setupPin() {
    if (_sendPin) return;
    _sendPin = getFunctions().CombatHUD_sendPinCommand;
  }
  function updatePin(now) {
    if (!state.pin || !_sendPin) return;
    if (now === void 0) now = Date.now();
    if (now - _lastFire < _opts3.intervalMs) return;
    try {
      _sendPin(EMPTY_PIN_ID);
      _lastFire = now;
      logEvery(
        10,
        "pin sent",
        {
          pin: EMPTY_PIN_ID,
          intervalMs: _opts3.intervalMs | 0
        }
      );
    } catch (e) {
      _lastFire = now;
      logError(
        "pin send failed",
        {
          err: String(e && e.message || e)
        }
      );
    }
  }

  // ../pc/src/agent/src/features/spectator.js
  var FRAME_SPECTATORS = 0;
  var FRAME_BRAWLTV = 1;
  var _brawltv = {
    count: 69
  };
  var _spec = {
    count: 69
  };
  var _gotoAndStop = null;
  var _setText2 = null;
  var _lastText2 = null;
  var _attached = false;
  function _clampCount(value) {
    return Math.max(0, Math.min(99999, value | 0));
  }
  function _applyText(textField, text) {
    if (text === _lastText2) return;
    withScString(text, (sc) => _setText2(textField, sc));
    _lastText2 = text;
    logInfo(
      "spectator count set",
      {
        text
      }
    );
  }
  function setBrawlTvOptions(o) {
    if (!o || typeof o !== "object") return;
    if (typeof o.count === "number" && isFinite(o.count)) {
      const v = _clampCount(o.count);
      if (v !== _brawltv.count) {
        _brawltv.count = v;
        _lastText2 = null;
      }
    }
  }
  function setSpecOptions(o) {
    if (!o || typeof o !== "object") return;
    if (typeof o.count === "number" && isFinite(o.count)) {
      const v = _clampCount(o.count);
      if (v !== _spec.count) {
        _spec.count = v;
        _lastText2 = null;
      }
    }
  }
  function resetSpectator() {
    _lastText2 = null;
  }
  function setupSpectator(base2) {
    if (_attached) return;
    const fns = getFunctions();
    _gotoAndStop = fns.MovieClip_gotoAndStopFrameIndex;
    _setText2 = fns.TextField_setText;
    Interceptor.attach(
      base2.add(offsets.BattleScreen__update),
      {
        onEnter(args) {
          this.screen = args[0];
        },
        onLeave() {
          if (!state.brawltv && !state.spec) {
            _lastText2 = null;
            return;
          }
          try {
            const screen = this.screen;
            if (!screen || screen.isNull()) return;
            const widget = screen.add(offsets.BattleScreen_spectateWidget).readPointer();
            if (!widget || widget.isNull()) return;
            const textField = screen.add(offsets.BattleScreen_spectateTextField).readPointer();
            if (!textField || textField.isNull()) return;
            const count = state.brawltv ? _brawltv.count : _spec.count;
            const frame = state.brawltv ? FRAME_BRAWLTV : FRAME_SPECTATORS;
            widget.add(offsets.DisplayObject_visible).writeU8(1);
            _applyText(textField, String(count));
            _gotoAndStop(widget, frame);
          } catch (_) {
          }
        }
      }
    );
    _attached = true;
  }

  // ../pc/src/agent/src/features/spray.js
  var SPRAY_SLOT = 10;
  var _opts4 = {
    intervalMs: 600
  };
  var _lastFire2 = 0;
  var _sendSpray = null;
  function resetSpray() {
    _lastFire2 = 0;
  }
  function setupSpray() {
    if (_sendSpray) return;
    _sendSpray = getFunctions().CombatHUD_sendSprayCommand;
  }
  function _battleReady() {
    const battle2 = getFunctions().BattleMode_getInstance();
    if (!battle2 || battle2.isNull()) return false;
    const objects = battle2.add(offsets.BattleMode_objectManagerPtr).readPointer();
    return !!(objects && !objects.isNull());
  }
  function updateSpray(now) {
    if (!state.spray || !_sendSpray) return;
    if (now === void 0) now = Date.now();
    if (now - _lastFire2 < _opts4.intervalMs) return;
    try {
      if (!_battleReady()) return;
      _sendSpray(SPRAY_SLOT);
      _lastFire2 = now;
      logEvery(
        10,
        "spray sent",
        {
          slot: SPRAY_SLOT,
          intervalMs: _opts4.intervalMs | 0
        }
      );
    } catch (_) {
      _lastFire2 = now;
      logError(
        "spray send failed",
        {
          err: String(_ && _.message || _)
        }
      );
    }
  }

  // ../pc/src/agent/src/features/spinner.js
  var MOVE_COORD_LIMIT = 1e5;
  var SPIN_RADIUS = 20;
  var SPIN_STEP = Math.PI / 4;
  var SPIN_ALLOW_MOVING = false;
  var _spinPhase = 0;
  var _moved = false;
  function resetSpinner() {
    _spinPhase = 0;
    _moved = false;
  }
  function _spinTarget(self) {
    if (!SPIN_ALLOW_MOVING) {
      try {
        if (self.add(offsets.BattleScreen_movePending).readU16() !== 0) return null;
      } catch (_) {
      }
    }
    _spinPhase += SPIN_STEP;
    if (_spinPhase >= Math.PI * 2) _spinPhase -= Math.PI * 2;
    const tx = Math.round(scanData.myX + Math.cos(_spinPhase) * SPIN_RADIUS);
    const ty = Math.round(scanData.myY + Math.sin(_spinPhase) * SPIN_RADIUS);
    if (!isFinite(tx) || !isFinite(ty)) return null;
    if (Math.abs(tx) > MOVE_COORD_LIMIT || Math.abs(ty) > MOVE_COORD_LIMIT) return null;
    return clampMoveTarget(tx, ty);
  }
  function setupSpinner(base2) {
    try {
      Interceptor.attach(
        base2.add(offsets.BattleScreen__updateMovement),
        {
          onEnter: function(args) {
            if (!state.spinner) return;
            if (state.autododge && getDodgeDir()) return;
            try {
              const self = args[0];
              if (!self || self.isNull()) return;
              const target = _spinTarget(self);
              if (!target) return;
              const fns = getFunctions();
              sendBattleMove(fns.BattleScreen_getLogicBattleModeClient(self), target.x, target.y);
              if (!_moved) {
                _moved = true;
                logInfo(
                  "spinner move",
                  {
                    x: target.x,
                    y: target.y
                  }
                );
              }
              logEvery(
                80,
                "spinner tick",
                {
                  x: target.x,
                  y: target.y,
                  phase: +_spinPhase.toFixed(3)
                }
              );
            } catch (e) {
              logError(
                "spinner tick failed",
                {
                  err: String(e && e.message || e)
                }
              );
            }
          }
        }
      );
    } catch (_) {
    }
  }

  // ../pc/src/agent/src/features/speedhack.js
  var MOVE_INPUT_TYPE2 = 2;
  var _base5 = null;
  var game = null;
  var getLocalChar = null;
  var setPosition = null;
  var getChar = null;
  var pathfind = null;
  var diagFlag = null;
  var drainMove = null;
  var charDx1 = null;
  var charDx2 = null;
  var charDy1 = null;
  var charDy2 = null;
  var posX = null;
  var posY = null;
  var flipByte = null;
  var gameUpdate = null;
  var _pathOut = null;
  var _bound = false;
  var getMainChar = null;
  var O = {
    gameBattle: 40,
    charCtx: 16,
    movingCtl: 1240,
    movingFlag: 186,
    resetSpeed: 3952,
    ctrlPtr: 2536
  };
  function off(android) {
    return _base5.add(android);
  }
  function battle() {
    const live = scanData.battleModeClient;
    if (live && !live.isNull()) return live;
    const g = game();
    return g && !g.isNull() ? g.add(O.gameBattle).readPointer() : null;
  }
  function tileMap(battleMode) {
    const fns = getFunctions();
    if (!fns || !fns.LogicBattleModeClient_getTileMap || !battleMode || battleMode.isNull()) return null;
    const map = fns.LogicBattleModeClient_getTileMap(battleMode);
    return map && !map.isNull() ? map : null;
  }
  function localChar() {
    const b = battle();
    return b && !b.isNull() ? getLocalChar(b) : null;
  }
  function currentPos() {
    const c = localChar();
    return c && !c.isNull() ? {
      x: posX(c),
      y: posY(c)
    } : null;
  }
  function serverMove(x, y) {
    return sendCommand(MOVE_INPUT_TYPE2, (ci) => {
      ci.add(offsets.ClientInput_x).writeS32(x | 0);
      ci.add(offsets.ClientInput_y).writeS32(y | 0);
    });
  }
  var speedHack = {
    enabled: false,
    hooked: false,
    pollTimer: null,
    tps: 0,
    frames: 0,
    tpsTimer: null,
    mainChar: null,
    controller: null,
    flipDir: 0,
    intervalTimer: null,
    drainTimer: null,
    lastServerSend: 0,
    lastBattleTick: 0,
    pending: 0,
    config: {
      boostTarget: 3.2,
      cliffMargin: 0,
      ssMinStep: 68,
      speedOff: 564,
      serverThrottleMs: 10,
      fpsCompensate: true,
      targetTps: 400,
      drainIntervalMs: 3,
      maxPending: 8,
      capTps: 560,
      capExp: 0.5,
      step: 114,
      intervalMs: 10
    },
    step: 104,
    clampMove(fromX, fromY, toX, toY) {
      const c = localChar();
      if (!c || c.isNull()) return null;
      const diag = 1 & diagFlag(c);
      const b = battle();
      if (!b || b.isNull()) return null;
      const map = tileMap(b);
      if (!map) return null;
      const out = _pathOut;
      if (!out || out.isNull()) return null;
      out.writeS32(-1);
      out.add(4).writeS32(-1);
      let res = pathfind(fromX, fromY, toX, toY, map, out, diag ? 1 : 0, 0, 0, 1);
      if (0 === res) return {
        x: toX,
        y: toY
      };
      const dx = toX - fromX;
      const dy = toY - fromY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1e-3) return {
        x: fromX,
        y: fromY
      };
      let slopeH;
      let slopeV;
      const vx = dx / dist * 600;
      const vy = dy / dist * 600;
      if (Math.abs(vx) >= 1e-3) {
        slopeH = Math.abs(vy / vx);
        slopeV = Math.abs(vx / vy);
      } else {
        slopeH = 100;
        slopeV = 0;
      }
      let cx = out.readS32();
      let cy = out.add(4).readS32();
      let cdx = cx - fromX;
      let cdy = cy - fromY;
      let cdist = Math.sqrt(cdx * cdx + cdy * cdy);
      if (cdist >= 21) {
        cdx = (cdist - 20) * cdx / cdist | 0;
        cdy = (cdist - 20) * cdy / cdist | 0;
      }
      let tx = fromX + cdx;
      let ty = fromY + cdy;
      let sx = 0;
      let sy = 0;
      if (cdist < 300) {
        if (4 === res || 1 === res) {
          if (slopeH > 2.5 && 0 !== cdy) {
            const dy2 = cdy > 0 ? 200 : -200;
            out.writeS32(-1);
            const r1 = pathfind(fromX, fromY, tx + 100, ty + dy2, map, out, diag ? 1 : 0, 0, 0, 1);
            out.writeS32(-1);
            const r2 = pathfind(fromX, fromY, tx - 100, ty + dy2, map, out, diag ? 1 : 0, 0, 0, 1);
            sx = 0 === (r1 | r2) || 0 !== r1 && 0 !== r2 ? cdx < 1 ? 0 !== cdx ? -this.step : 0 : this.step : 0 === r2 ? -this.step : this.step;
          } else {
            sx = cdx < 1 ? 0 !== cdx ? -this.step : 0 : this.step;
          }
        } else if (slopeV > 2.5 && 0 !== cdx) {
          const dx2 = cdx > 0 ? 200 : -200;
          out.writeS32(-1);
          const r3 = pathfind(fromX, fromY, tx + dx2, ty + 100, map, out, diag ? 1 : 0, 0, 0, 1);
          out.writeS32(-1);
          const r4 = pathfind(fromX, fromY, tx + dx2, ty - 100, map, out, diag ? 1 : 0, 0, 0, 1);
          sy = 0 === (r3 | r4) || 0 !== r3 && 0 !== r4 ? cdy < 1 ? 0 !== cdy ? -this.step : 0 : this.step : 0 === r4 ? -this.step : this.step;
        } else {
          sy = cdy < 1 ? 0 !== cdy ? -this.step : 0 : this.step;
        }
        tx = fromX + sx;
        ty = fromY + sy;
        out.writeS32(-1);
        out.add(4).writeS32(-1);
        if (0 !== pathfind(fromX, fromY, tx, ty, map, out, diag ? 1 : 0, 0, 0, 1)) {
          cx = out.readS32();
          cy = out.add(4).readS32();
          cdx = cx - fromX;
          cdy = cy - fromY;
          cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist >= 21) {
            cdx = (cdist - 20) * cdx / cdist | 0;
            cdy = (cdist - 20) * cdy / cdist | 0;
            tx = fromX + cdx;
            ty = fromY + cdy;
          } else {
            return {
              x: fromX,
              y: fromY
            };
          }
        }
      }
      return {
        x: Math.round(tx),
        y: Math.round(ty)
      };
    },
    inBattle() {
      return this.lastBattleTick > 0 && Date.now() - this.lastBattleTick < 32;
    },
    tick() {
      try {
        if (!this.inBattle()) {
          this.stop();
          return;
        }
        const ch = this.mainChar;
        if (!ch || ch.isNull()) {
          this.stop();
          return;
        }
        const ctl = this.controller;
        if (!ctl || ctl.isNull()) {
          this.stop();
          return;
        }
        const moving = ctl.add(O.movingCtl).readPointer();
        if (!moving || moving.isNull()) {
          this.stop();
          return;
        }
        const cfg = this.config;
        const now = Date.now();
        const dodge = getDodgeDir();
        let dirX = 0;
        let dirY = 0;
        if (dodge) {
          dirX = dodge.x;
          dirY = dodge.y;
          ch.add(O.resetSpeed).writeFloat(0);
        } else {
          if (!moving.add(O.movingFlag).readU8()) {
            scanData.hackSpeed = 0;
            return;
          }
          ch.add(O.resetSpeed).writeFloat(0);
          let dx = charDx1(ch) - charDx2(ch);
          let dy = charDy1(ch) - charDy2(ch);
          if (this.flipDir) {
            dx = -dx;
            dy = -dy;
          }
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len < 0.01) return;
          dirX = -dx / len;
          dirY = -dy / len;
        }
        const pos = currentPos();
        if (!pos) {
          this.stop();
          return;
        }
        const c = localChar();
        if (!c || c.isNull()) {
          this.stop();
          return;
        }
        const speed = c.add(cfg.speedOff).readInt();
        let step = speed >= 1 ? cfg.boostTarget * speed / 20 : cfg.step;
        const cap = speed / 10 - cfg.cliffMargin;
        if (step > cap) step = cap;
        if (step < cfg.ssMinStep) step = cfg.ssMinStep;
        if (cfg.capTps > 0 && this.tps > cfg.capTps) step *= Math.pow(cfg.capTps / this.tps, cfg.capExp);
        scanData.hackSpeed = step * (1e3 / cfg.intervalMs);
        const target = this.clampMove(pos.x, pos.y, Math.round(pos.x + dirX * step), Math.round(pos.y + dirY * step));
        if (!target) return;
        const ctx = game();
        if (!ctx || ctx.isNull()) {
          this.stop();
          return;
        }
        const c2 = getChar(ctx.add(O.charCtx).readPointer());
        if (!c2 || c2.isNull()) {
          this.stop();
          return;
        }
        setPosition(c2, target.x, target.y, 1);
        if (now - this.lastServerSend >= cfg.serverThrottleMs) {
          this.lastServerSend = now;
          serverMove(target.x, target.y);
        }
        logEvery(
          80,
          "speedhack tick",
          {
            x: pos.x | 0,
            y: pos.y | 0,
            tx: target.x,
            ty: target.y,
            speed: speed | 0,
            dodge: !!dodge
          }
        );
      } catch (e) {
        logError(
          "speedhack tick failed",
          {
            err: String(e && e.message || e)
          }
        );
      }
    },
    fpsCompensate() {
      const tps = this.tps || 60;
      if (tps >= this.config.targetTps) {
        this.pending = 0;
        return;
      }
      this.pending = Math.min(this.pending + (this.config.targetTps - tps) / tps, this.config.maxPending);
    },
    drain() {
      try {
        if (!this.enabled || this.pending < 1 || !this.inBattle()) {
          if (this.enabled && !this.inBattle()) this.stop();
          return;
        }
        const c = localChar();
        if (!c || c.isNull()) {
          this.stop();
          return;
        }
        const b = battle();
        if (!b || b.isNull()) {
          this.stop();
          return;
        }
        const seq = b.add(184).readInt();
        drainMove(c, seq / 50 | 0, seq % 50 * 20, b, 0);
        this.pending -= 1;
      } catch (_) {
      }
    },
    attachUpdate() {
      if (this.hooked) return;
      this.hooked = true;
      const self = this;
      try {
        Interceptor.attach(
          gameUpdate,
          {
            onEnter() {
              self.frames++;
            },
            onLeave() {
              try {
                if (self.enabled) self.fpsCompensate();
              } catch (_) {
              }
            }
          }
        );
      } catch (_) {
      }
    },
    start() {
      this.attachUpdate();
      this.enabled = true;
      if (!this.tpsTimer) {
        this.tpsTimer = setInterval(() => {
          this.tps = this.frames;
          this.frames = 0;
        }, 1e3);
      }
      if (!this.intervalTimer) {
        this.intervalTimer = setInterval(() => this.tick(), this.config.intervalMs);
        logInfo(
          "speedhack started",
          {
            intervalMs: this.config.intervalMs,
            boostTarget: this.config.boostTarget,
            fpsCompensate: !!this.config.fpsCompensate,
            drainIntervalMs: this.config.drainIntervalMs,
            serverThrottleMs: this.config.serverThrottleMs,
            targetTps: this.config.targetTps
          }
        );
      }
      if (this.config.fpsCompensate && !this.drainTimer) {
        this.drainTimer = setInterval(() => this.drain(), this.config.drainIntervalMs);
      }
    },
    stop() {
      this.enabled = false;
      if (this.intervalTimer) {
        clearInterval(this.intervalTimer);
        this.intervalTimer = null;
        logInfo("speedhack stopped");
      }
      if (this.drainTimer) {
        clearInterval(this.drainTimer);
        this.drainTimer = null;
      }
      if (this.tpsTimer) {
        clearInterval(this.tpsTimer);
        this.tpsTimer = null;
      }
      this.tps = 0;
      this.frames = 0;
      this.mainChar = null;
      this.controller = null;
      this.pending = 0;
      this.lastBattleTick = 0;
      scanData.hackSpeed = 0;
    },
    checkAndStart() {
      if (!state.speedhack) {
        if (this.enabled) this.stop();
        return;
      }
      if (!this.inBattle()) {
        if (this.enabled) this.stop();
        return;
      }
      if (!getMainChar) return;
      const mc = getMainChar();
      if (mc && !mc.isNull() && tileMap(battle())) {
        this.mainChar = mc;
        this.controller = mc.add(O.ctrlPtr).readPointer();
        this.flipDir = 1 & flipByte.readU8();
        this.start();
      } else if (this.enabled) {
        this.stop();
      }
    },
    update() {
      if (this.pollTimer) return;
      const self = this;
      this.pollTimer = setInterval(() => {
        try {
          self.checkAndStart();
        } catch (_) {
        }
      }, 500);
    }
  };
  function _guestAlloc(size) {
    const mallocPtr = Process.getModuleByName("libc.so").getExportByName("malloc");
    const allocated = new NativeFunction(mallocPtr, "pointer", ["uint"])(size);
    if (!allocated || allocated.isNull()) throw new Error("libc malloc failed");
    return allocated;
  }
  function _bind(base2) {
    _base5 = base2;
    _pathOut = _guestAlloc(16);
    if (!_pathOut) return;
    game = new NativeFunction(off(10204648), "pointer", []);
    getLocalChar = new NativeFunction(off(12728752), "pointer", ["pointer"]);
    setPosition = new NativeFunction(off(12729108), "pointer", ["pointer", "int", "int", "bool"]);
    getChar = new NativeFunction(off(8890956), "pointer", ["pointer"]);
    pathfind = new NativeFunction(off(13021888), "int", ["int", "int", "int", "int", "pointer", "pointer", "bool", "int", "int", "int"]);
    diagFlag = new NativeFunction(off(11741260), "int", ["pointer"]);
    drainMove = new NativeFunction(off(11742912), "void", ["pointer", "int", "int", "pointer", "float"]);
    getMainChar = new NativeFunction(off(8844264), "pointer", []);
    charDx1 = new NativeFunction(off(8842960), "float", ["pointer"]);
    charDx2 = new NativeFunction(off(8842976), "float", ["pointer"]);
    charDy1 = new NativeFunction(off(8842968), "float", ["pointer"]);
    charDy2 = new NativeFunction(off(8842984), "float", ["pointer"]);
    posX = new NativeFunction(off(11920460), "uint32", ["pointer"]);
    posY = new NativeFunction(off(11920468), "uint32", ["pointer"]);
    flipByte = off(19850760);
    gameUpdate = off(5046820);
    _bound = true;
  }
  function resetSpeedhack() {
    speedHack.stop();
  }
  function setupSpeedhack(base2) {
    if (_bound) {
      speedHack.update();
      return;
    }
    _bind(base2);
    if (_bound) speedHack.update();
  }
  function updateSpeedhack() {
    if (!state.speedhack || !_bound) return;
    speedHack.lastBattleTick = Date.now();
    speedHack.checkAndStart();
  }

  // src/feature-list.js
  var APK_FEATURES = Object.freeze([
    Object.freeze({
      key: "aimbot",
      label: "Aimbot"
    }),
    Object.freeze({
      key: "dodgesex",
      label: "DodgeSex"
    }),
    Object.freeze({
      key: "esp",
      label: "ESP"
    }),
    Object.freeze({
      key: "spinner",
      label: "Spinner"
    }),
    Object.freeze({
      key: "killaura",
      label: "Kill Aura"
    }),
    Object.freeze({
      key: "camera",
      label: "Camera"
    }),
    Object.freeze({
      key: "spray",
      label: "Spam Spray"
    }),
    Object.freeze({
      key: "pin",
      label: "Empty Pin"
    }),
    Object.freeze({
      key: "brawltv",
      label: "BrawlTV"
    }),
    Object.freeze({
      key: "spec",
      label: "Spectators"
    }),
    Object.freeze({
      key: "chatspam",
      label: "Chat Spam"
    }),
    Object.freeze({
      key: "fps",
      label: "FPS"
    }),
    Object.freeze({
      key: "gradient",
      label: "Gradient"
    }),
    Object.freeze({
      key: "holdshoot",
      label: "Hold Shoot"
    }),
    Object.freeze({
      key: "speedhack",
      label: "Speedhack"
    })
  ]);
  var APK_FEATURE_KEYS = new Set(APK_FEATURES.map(({
    key
  }) => key));

  // src/index.js
  var ACTIVE_MASK = FLAG_AIMBOT | FLAG_AUTODODGE | FLAG_ESP | FLAG_SPINNER | FLAG_KILLAURA | FLAG_SPRAY | FLAG_PIN | FLAG_HOLDSHOOT | FLAG_SPEEDHACK;
  var AIM_OR_KILL = FLAG_AIMBOT | FLAG_KILLAURA;
  var TICK_FEATURES = /* @__PURE__ */ new Set(["aimbot", "PromonSex", "killaura", "esp", "spray", "pin", "spinner", "holdshoot", "speedhack"]);
  var FEATURE_SETUP = {
    aimbot: setupAimbot,
    autododge: setupAutododge,
    killaura: setupCombat,
    holdshoot: setupCombat,
    esp: setupESP,
    gradient: setupGradient,
    camera: setupCamera,
    brawltv: setupSpectator,
    spec: setupSpectator,
    spinner: setupSpinner,
    pin: setupPin,
    spray: setupSpray,
    speedhack: setupSpeedhack,
    chatspam: setupChatSpam,
    fps: setupFps
  };
  var SETUP_KEYS = {
    brawltv: "spectator",
    spec: "spectator",
    killaura: "combat",
    holdshoot: "combat"
  };
  var FEATURE_DEPENDENCIES = {
    esp: ["camera"],
    killaura: ["camera"],
    holdshoot: ["camera"],
    brawltv: ["camera"],
    spec: ["camera"]
  };
  var ALLOWED_FEATURES = APK_FEATURE_KEYS;
  var nativeBase = null;
  var battleHookInstalled = false;
  var basePromise = null;
  var runtimePromise = null;
  var lastGradientName = "";
  var initializedFeatures = /* @__PURE__ */ new Set();
  function isFeatureEnabled(feature) {
    return !!state[feature];
  }
  function apkLog(message) {
    try {
      const file = new File("/data/data/com.supercell.brawlstars/files/revenge/agent.log", "a");
      file.write(message + "\n");
      file.close();
    } catch (_) {
    }
  }
  function apkSetup(label, fn) {
    const ok = setupSafe(label, fn);
    apkLog("setup " + label + " " + ok);
    return ok;
  }
  function setupFeature(feature) {
    const setupKey = SETUP_KEYS[feature] || feature;
    if (!nativeBase || initializedFeatures.has(setupKey)) return;
    for (const dependency of FEATURE_DEPENDENCIES[feature] || []) setupFeature(dependency);
    const setup = FEATURE_SETUP[feature];
    if (!setup) return;
    let installed = false;
    apkSetup(setupKey, () => {
      setup(nativeBase);
      installed = true;
    });
    if (installed) initializedFeatures.add(setupKey);
  }
  function ensureBase() {
    if (!basePromise) {
      basePromise = libg().then((base2) => {
        nativeBase = base2;
        return base2;
      });
    }
    return basePromise;
  }
  function ensureRuntime() {
    if (!runtimePromise) {
      runtimePromise = ensureBase().then(() => {
        apkSetup("initFunctions", () => initFunctions(nativeBase));
        apkSetup("initCSV", () => initCSV(nativeBase));
        apkSetup("initDataTables", () => initDataTables(nativeBase));
        apkSetup("initScanner", () => initScanner(nativeBase));
        apkSetup("watchTileChanges", () => watchTileChanges(nativeBase));
        setCameraOptions({
          mode: 0
        });
        setBrawlTvOptions({
          count: 69
        });
        setSpecOptions({
          count: 69
        });
        setChatSpamOptions({
          message: "4hypeless on top!"
        });
        return true;
      }).catch(() => false);
    }
    return runtimePromise;
  }
  function setupBattleHook() {
    if (!nativeBase || battleHookInstalled) return;
    battleHookInstalled = true;
    let lastBM = null;
    Interceptor.attach(nativeBase.add(offsets.LogicBattleModeClient_update), {
      onEnter(args) {
        try {
          const bm = args[0];
          if (!bm || bm.isNull()) return;
          if (!lastBM || !lastBM.equals(bm)) {
            lastBM = bm;
            resetBattleState(bm);
          }
          const flags = getFlags();
          const now = Date.now();
          if ((flags & ACTIVE_MASK) === 0) return;
          updateScanner(bm, now);
          maybeRefreshWallCache(bm, now);
          if (flags & AIM_OR_KILL) updateAimbot(now);
          if (flags & FLAG_KILLAURA) updateKillaura(now);
          if (flags & FLAG_AUTODODGE) updateAutododge();
          if (flags & FLAG_ESP) updateESP();
          if (flags & FLAG_SPRAY) updateSpray(now);
          if (flags & FLAG_PIN) updatePin(now);
          if (flags & FLAG_HOLDSHOOT) updateHoldShoot(now);
          if (flags & FLAG_SPEEDHACK) updateSpeedhack(now);
        } catch (_) {
        }
      }
    });
  }
  function pickRandomGradient() {
    const names = listGradients();
    if (!names.length) return;
    const pool = names.filter((name2) => name2 !== lastGradientName);
    const choices = pool.length ? pool : names;
    const name = choices[Math.floor(Math.random() * choices.length)];
    lastGradientName = name;
    setGradientOptions({
      name
    });
  }
  function activateFeature(feature) {
    ensureRuntime().then((ready2) => {
      try {
        const file = new File("/data/data/com.supercell.brawlstars/files/revenge/agent.log", "a");
        file.write("activate " + feature + " ready=" + ready2 + " base=" + nativeBase + "\n");
        file.close();
      } catch (_) {
      }
      if (!ready2 || !state[feature]) return;
      setupFeature(feature);
      if (TICK_FEATURES.has(feature)) setupBattleHook();
      if (feature === "gradient") pickRandomGradient();
      if (feature === "chatspam") startChatSpam();
    });
  }
  function toggleFeature(feature) {
    if (!ALLOWED_FEATURES.has(feature)) return false;
    const enabled = !state[feature];
    if (enabled && feature === "brawltv") setState("spec", false);
    if (enabled && feature === "spec") setState("brawltv", false);
    setState(feature, enabled);
    if (enabled) activateFeature(feature);
    if (!enabled && feature === "gradient") applyGradientAll();
    if (!enabled) {
      if (feature === "aimbot") resetAimbot();
      if (feature === "PromonDodge") resetAutododge();
      if (feature === "spinner") resetSpinner();
      if (feature === "esp") resetESP();
      if (feature === "camera") resetCamera();
      if (feature === "killaura") resetKillaura();
      if (feature === "spray") resetSpray();
      if (feature === "pin") resetPin();
      if (feature === "speedhack") resetSpeedhack();
      if (feature === "holdshoot") resetHoldShoot();
      if (feature === "fps") resetFps();
      if (feature === "chatspam") stopChatSpam();
      if (feature === "brawltv" || feature === "spec") resetSpectator();
    }
    return enabled;
  }
  function resetBattleState(bm) {
    resetAimbot();
    resetAutododge();
    resetSpinner();
    resetESP();
    resetCamera();
    resetSpray();
    resetPin();
    resetKillaura();
    resetCombat();
    resetSpectator();
    resetGradient();
    resetSpeedhack();
    resetHoldShoot();
    resetFps();
    resetChatSpam();
    resetScannerCache();
    notifyBattleModeChanged(bm);
  }
  function watchFlags(toggleFeature2, isFeatureEnabled2) {
    const path = "/data/data/com.supercell.brawlstars/files/revenge/flags.txt";
    let last = "";
    setInterval(() => {
      try {
        const text = typeof File.readAllText === "function" ? File.readAllText(path) : "";
        if (!text || text === last) return;
        last = text;
        for (const line of text.split(/\r?\n/)) {
          const split = line.indexOf("=");
          if (split < 1) continue;
          const key = line.slice(0, split).trim();
          const on = line.slice(split + 1).trim() === "1";
          if (!!isFeatureEnabled2(key) === on) continue;
          toggleFeature2(key);
        }
      } catch (_) {
      }
    }, 250);
  }
  function startAgent() {
    watchFlags(toggleFeature, isFeatureEnabled);
    ensureBase().then((base2) => {
      apkLog("libg " + base2 + " arch=" + Process.arch);
    }).catch((error) => {
      apkLog("libg fail " + error);
    });
  }
  startAgent();
})();
