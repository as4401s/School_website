"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type AcademicCatMascotVariant =
  | "default"
  | "hero"
  | "feature"
  | "compact"
  | "reader";

type AcademicCatMascotProps = {
  className?: string;
  variant?: AcademicCatMascotVariant;
};

function createAcademicCatScene(
  container: HTMLDivElement,
  THREE: typeof import("three"),
) {
  const COLORS = {
    catMain: 0x64748b,
    catWhite: 0xffffff,
    nosePink: 0xff77a9,
    eyes: 0xffffff,
    pupils: 0x1e293b,
    sparkle: 0xffffff,
    capBase: 0x1a1a24,
    tassel: 0xfbbf24,
    bagMain: 0x3b82f6,
  };

  const getSize = () => ({
    width: Math.max(container.clientWidth, 1),
    height: Math.max(container.clientHeight, 1),
  });

  const scene = new THREE.Scene();
  scene.background = null;

  const initialSize = getSize();
  const camera = new THREE.PerspectiveCamera(
    40,
    initialSize.width / initialSize.height,
    0.1,
    100,
  );
  camera.position.z = 18;
  camera.position.y = 1;
  camera.position.x = 0;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(initialSize.width, initialSize.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.className = "academic-cat-mascot__canvas";
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.65);
  mainLight.position.set(8, 12, 10);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.bias = -0.001;
  scene.add(mainLight);

  const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.5);
  fillLight.position.set(-8, 0, 5);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffd700, 0.4);
  rimLight.position.set(0, 5, -10);
  scene.add(rimLight);

  const mascot = new THREE.Group();
  const mascotParts: Record<string, any> = {};

  const catMat = new THREE.MeshStandardMaterial({
    color: COLORS.catMain,
    roughness: 0.8,
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: COLORS.catWhite,
    roughness: 0.8,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: COLORS.nosePink,
    roughness: 0.6,
  });
  const eyeMat = new THREE.MeshStandardMaterial({
    color: COLORS.eyes,
    roughness: 0.1,
  });
  const pupilMat = new THREE.MeshStandardMaterial({
    color: COLORS.pupils,
    roughness: 0.1,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: COLORS.capBase,
    roughness: 0.9,
  });
  const bagMat = new THREE.MeshStandardMaterial({
    color: COLORS.bagMain,
    roughness: 0.7,
  });

  const bodyGroup = new THREE.Group();
  mascot.add(bodyGroup);
  mascotParts.body = bodyGroup;

  const bodyGeo = new THREE.SphereGeometry(1.8, 64, 64);
  const body = new THREE.Mesh(bodyGeo, catMat);
  body.scale.set(1, 1.15, 0.9);
  body.position.y = -1;
  body.castShadow = true;
  bodyGroup.add(body);

  const bellyGeo = new THREE.SphereGeometry(1.5, 64, 64);
  const belly = new THREE.Mesh(bellyGeo, whiteMat);
  belly.scale.set(0.9, 1, 0.6);
  belly.position.set(0, -1.2, 1);
  bodyGroup.add(belly);

  const bagGroup = new THREE.Group();
  bagGroup.position.set(0, -0.6, -1.5);

  const bagMainGeo = new THREE.SphereGeometry(1.1, 64, 64);
  bagMainGeo.scale(1, 1.2, 0.5);
  const bagMain = new THREE.Mesh(bagMainGeo, bagMat);
  bagMain.castShadow = true;
  bagGroup.add(bagMain);

  const bagPocketGeo = new THREE.SphereGeometry(0.8, 64, 64);
  bagPocketGeo.scale(1, 0.8, 0.4);
  const bagPocket = new THREE.Mesh(bagPocketGeo, bagMat);
  bagPocket.position.set(0, -0.4, -0.5);
  bagGroup.add(bagPocket);
  bodyGroup.add(bagGroup);

  const pawGeo = new THREE.SphereGeometry(0.5, 64, 64);

  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-1.6, -0.2, 0.5);
  const leftArm = new THREE.Mesh(pawGeo, whiteMat);
  leftArm.scale.set(1, 1.4, 1);
  leftArm.position.y = -0.5;
  leftArmGroup.add(leftArm);
  bodyGroup.add(leftArmGroup);
  mascotParts.leftArm = leftArmGroup;

  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(1.6, -0.2, 0.5);
  const rightArm = new THREE.Mesh(pawGeo, whiteMat);
  rightArm.scale.set(1, 1.4, 1);
  rightArm.position.y = -0.5;
  rightArmGroup.add(rightArm);
  bodyGroup.add(rightArmGroup);
  mascotParts.rightArm = rightArmGroup;

  function createFoot() {
    const footGroup = new THREE.Group();
    const foot = new THREE.Mesh(pawGeo, whiteMat);
    foot.scale.set(1.1, 1.4, 1.2);
    foot.position.y = -0.5;
    footGroup.add(foot);

    const beanGeo = new THREE.SphereGeometry(0.12, 32, 32);

    const mainPad = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 32, 32),
      pinkMat,
    );
    mainPad.scale.set(1.2, 1, 0.5);
    mainPad.position.set(0, -1, 0.5);
    mainPad.rotation.x = Math.PI / 4;
    footGroup.add(mainPad);

    const toe1 = new THREE.Mesh(beanGeo, pinkMat);
    toe1.position.set(-0.25, -0.7, 0.55);
    footGroup.add(toe1);

    const toe2 = new THREE.Mesh(beanGeo, pinkMat);
    toe2.position.set(0, -0.65, 0.6);
    footGroup.add(toe2);

    const toe3 = new THREE.Mesh(beanGeo, pinkMat);
    toe3.position.set(0.25, -0.7, 0.55);
    footGroup.add(toe3);

    return footGroup;
  }

  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(-1, -1.8, 0.2);
  leftLegGroup.add(createFoot());
  bodyGroup.add(leftLegGroup);
  mascotParts.leftLeg = leftLegGroup;

  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(1, -1.8, 0.2);
  rightLegGroup.add(createFoot());
  bodyGroup.add(rightLegGroup);
  mascotParts.rightLeg = rightLegGroup;

  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, -1.6, -1.2);
  const tailGeo = new THREE.SphereGeometry(0.75, 64, 64);
  const tail = new THREE.Mesh(tailGeo, catMat);
  tail.scale.set(1, 3.5, 1.2);
  tail.position.set(0, 1.8, -0.6);
  tail.rotation.x = -Math.PI / 3.5;
  tailGroup.add(tail);
  bodyGroup.add(tailGroup);
  mascotParts.tail = tailGroup;

  const headGroup = new THREE.Group();
  headGroup.position.y = 1;
  mascot.add(headGroup);
  mascotParts.head = headGroup;

  const headGeo = new THREE.SphereGeometry(2.2, 64, 64);
  const head = new THREE.Mesh(headGeo, catMat);
  head.scale.set(1.3, 0.95, 1.1);
  head.castShadow = true;
  headGroup.add(head);

  const earGeo = new THREE.ConeGeometry(0.6, 1.4, 64);
  const innerEarGeo = new THREE.ConeGeometry(0.35, 1, 64);

  const leftEar = new THREE.Group();
  leftEar.position.set(-1.6, 1.8, 0.2);
  leftEar.rotation.z = 0.3;
  leftEar.rotation.x = -0.1;
  const leftEarOuter = new THREE.Mesh(earGeo, catMat);
  const leftEarInner = new THREE.Mesh(innerEarGeo, pinkMat);
  leftEarInner.position.set(0, -0.1, 0.28);
  leftEar.add(leftEarOuter, leftEarInner);
  headGroup.add(leftEar);

  const rightEar = new THREE.Group();
  rightEar.position.set(1.6, 1.8, 0.2);
  rightEar.rotation.z = -0.3;
  rightEar.rotation.x = -0.1;
  const rightEarOuter = new THREE.Mesh(earGeo, catMat);
  const rightEarInner = new THREE.Mesh(innerEarGeo, pinkMat);
  rightEarInner.position.set(0, -0.1, 0.28);
  rightEar.add(rightEarOuter, rightEarInner);
  headGroup.add(rightEar);

  const faceGroup = new THREE.Group();
  headGroup.add(faceGroup);

  const snoutGeo = new THREE.SphereGeometry(0.9, 64, 64);
  const snout = new THREE.Mesh(snoutGeo, whiteMat);
  snout.scale.set(1.3, 0.75, 0.4);
  snout.position.set(0, -0.5, 2.2);
  faceGroup.add(snout);

  const noseGeo = new THREE.SphereGeometry(0.15, 32, 32);
  const nose = new THREE.Mesh(noseGeo, pinkMat);
  nose.scale.set(1.2, 0.8, 0.6);
  nose.position.set(0, -0.35, 2.55);
  faceGroup.add(nose);

  const mouthsGroup = new THREE.Group();
  faceGroup.add(mouthsGroup);
  mascotParts.mouths = {};

  const mouthMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const insideMouthMat = new THREE.MeshBasicMaterial({ color: 0x1a0f14 });

  const standardMouth = new THREE.Group();
  const mouthGeo = new THREE.TorusGeometry(0.18, 0.04, 32, 64, Math.PI);
  const leftMouth = new THREE.Mesh(mouthGeo, mouthMat);
  leftMouth.rotation.x = Math.PI;
  leftMouth.position.set(-0.18, -0.55, 2.5);
  const rightMouth = new THREE.Mesh(mouthGeo, mouthMat);
  rightMouth.rotation.x = Math.PI;
  rightMouth.position.set(0.18, -0.55, 2.5);
  standardMouth.add(leftMouth, rightMouth);
  mouthsGroup.add(standardMouth);
  mascotParts.mouths.standard = standardMouth;

  const tongueMouth = new THREE.Group();
  tongueMouth.add(leftMouth.clone(), rightMouth.clone());
  const tongueGeo = new THREE.SphereGeometry(0.12, 32, 32);
  const tongue = new THREE.Mesh(tongueGeo, pinkMat);
  tongue.scale.set(1, 1.5, 0.5);
  tongue.position.set(0, -0.7, 2.52);
  tongue.rotation.x = -0.2;
  tongueMouth.add(tongue);
  mouthsGroup.add(tongueMouth);
  mascotParts.mouths.tongue = tongueMouth;
  mascotParts.tongueMesh = tongue;

  const openMouth = new THREE.Group();
  const cavity = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 32, 32),
    insideMouthMat,
  );
  cavity.scale.set(1.4, 1.2, 0.2);
  cavity.position.set(0, -0.6, 2.51);
  openMouth.add(cavity);
  const insideTongue = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 32, 32),
    pinkMat,
  );
  insideTongue.scale.set(1.2, 0.8, 0.4);
  insideTongue.position.set(0, -0.75, 2.54);
  openMouth.add(insideTongue);
  mouthsGroup.add(openMouth);
  mascotParts.mouths.open = openMouth;

  const surprisedMouth = new THREE.Group();
  const surprisedMesh = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.04, 16, 32),
    mouthMat,
  );
  surprisedMesh.position.set(0, -0.6, 2.52);
  surprisedMouth.add(surprisedMesh);
  mouthsGroup.add(surprisedMouth);
  mascotParts.mouths.surprised = surprisedMouth;

  mascotParts.setExpression = (expression: string) => {
    Object.values(
      mascotParts.mouths as Record<string, { visible: boolean }>,
    ).forEach((mouth) => {
      mouth.visible = false;
    });

    if (mascotParts.mouths[expression]) {
      mascotParts.mouths[expression].visible = true;
    }
  };
  mascotParts.setExpression("standard");

  const whiskerGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 16);
  const whiskerMat = new THREE.MeshBasicMaterial({ color: 0xdddddd });
  for (let i = 0; i < 2; i += 1) {
    const leftWhisker = new THREE.Mesh(whiskerGeo, whiskerMat);
    leftWhisker.position.set(-1.4, -0.4 - i * 0.2, 2.1);
    leftWhisker.rotation.z = Math.PI / 2 + (i * 0.1 - 0.05);
    leftWhisker.rotation.y = 0.2;
    faceGroup.add(leftWhisker);

    const rightWhisker = new THREE.Mesh(whiskerGeo, whiskerMat);
    rightWhisker.position.set(1.4, -0.4 - i * 0.2, 2.1);
    rightWhisker.rotation.z = Math.PI / 2 - (i * 0.1 - 0.05);
    rightWhisker.rotation.y = -0.2;
    faceGroup.add(rightWhisker);
  }

  const eyeGeo = new THREE.SphereGeometry(0.5, 64, 64);
  const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(-1, 0.3, 2.15);
  leftEye.scale.set(1.2, 1.7, 0.3);
  leftEye.rotation.y = -0.25;
  leftEye.rotation.z = 0.05;
  faceGroup.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
  rightEye.position.set(1, 0.3, 2.15);
  rightEye.scale.set(1.2, 1.7, 0.3);
  rightEye.rotation.y = 0.25;
  rightEye.rotation.z = -0.05;
  faceGroup.add(rightEye);

  const pupilsGroup = new THREE.Group();
  faceGroup.add(pupilsGroup);
  mascotParts.pupils = pupilsGroup;

  function createPupil() {
    const pupilGroup = new THREE.Group();

    const blackPart = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 64, 64),
      pupilMat,
    );
    blackPart.scale.set(1.1, 1.6, 0.1);
    pupilGroup.add(blackPart);

    const sparkleMat = new THREE.MeshBasicMaterial({ color: COLORS.sparkle });

    const bigSparkle = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 32, 32),
      sparkleMat,
    );
    bigSparkle.position.set(0.12, 0.18, 0.05);
    bigSparkle.scale.set(0.8, 0.8, 0.5);
    pupilGroup.add(bigSparkle);

    const smallSparkle = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 32, 32),
      sparkleMat,
    );
    smallSparkle.position.set(-0.12, -0.1, 0.05);
    smallSparkle.scale.set(0.8, 0.8, 0.5);
    pupilGroup.add(smallSparkle);

    return pupilGroup;
  }

  const leftPupil = createPupil();
  leftPupil.position.set(-1, 0.3, 2.34);
  leftPupil.rotation.y = -0.25;
  leftPupil.rotation.z = 0.05;
  pupilsGroup.add(leftPupil);

  const rightPupil = createPupil();
  rightPupil.position.set(1, 0.3, 2.34);
  rightPupil.rotation.y = 0.25;
  rightPupil.rotation.z = -0.05;
  pupilsGroup.add(rightPupil);

  const capGroup = new THREE.Group();
  capGroup.position.set(0, 2, 0.2);
  capGroup.rotation.x = -0.1;
  capGroup.rotation.z = 0.1;
  const capSkull = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 0.4, 64),
    capMat,
  );
  capGroup.add(capSkull);

  const capBoard = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.1, 3.6),
    capMat,
  );
  capBoard.position.y = 0.25;
  capBoard.castShadow = true;
  capGroup.add(capBoard);

  const tasselMat = new THREE.MeshStandardMaterial({
    color: COLORS.tassel,
    roughness: 0.4,
  });
  const tasselButton = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 32, 32),
    tasselMat,
  );
  tasselButton.position.y = 0.35;
  capGroup.add(tasselButton);

  const tasselString = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 1.6, 16),
    tasselMat,
  );
  tasselString.position.set(1.6, -0.4, 1.6);
  tasselString.rotation.x = 0.2;
  tasselString.rotation.z = -0.2;
  capGroup.add(tasselString);
  headGroup.add(capGroup);

  scene.add(mascot);

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let lastMoveTime = Date.now();
  let idleWeight = 0;
  let frameId = 0;

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    lastMoveTime = Date.now();
  };

  const resize = () => {
    const { width, height } = getSize();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const clock = new THREE.Clock();
  const { lerp } = THREE.MathUtils;

  const animate = () => {
    frameId = window.requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    targetX += (mouseX - targetX) * 0.08;
    targetY += (mouseY - targetY) * 0.08;

    const timeSinceMove = (Date.now() - lastMoveTime) / 1000;
    if (timeSinceMove > 3) {
      idleWeight = lerp(idleWeight, 1, 0.03);
    } else {
      idleWeight = lerp(idleWeight, 0, 0.08);
    }

    const headVelocity = Math.sqrt(
      (mouseX - targetX) ** 2 + (mouseY - targetY) ** 2,
    );

    if (idleWeight > 0.5) {
      mascotParts.setExpression("tongue");
    } else if (headVelocity > 0.6) {
      mascotParts.setExpression("surprised");
    } else if (headVelocity > 0.1) {
      mascotParts.setExpression("open");
    } else {
      mascotParts.setExpression("standard");
    }

    mascotParts.mouths.standard.scale.set(1, 1, 1);
    mascotParts.mouths.standard.position.y = 0;
    mascotParts.tongueMesh.scale.y = 1.5 + Math.abs(Math.sin(time * 8)) * 0.8;
    mascotParts.tongueMesh.rotation.x = -0.2 - Math.sin(time * 8) * 0.2;
    mascotParts.mouths.open.scale.y = 1 + Math.abs(Math.sin(time * 10)) * 0.2;
    mascotParts.mouths.open.position.y = Math.sin(time * 10) * 0.02;
    mascotParts.mouths.surprised.scale.set(1, 1, 1);

    const activeBodyY = 0.5 + Math.sin(time * 2) * 0.05;
    const idleBodyY = -0.5;
    mascot.position.y = lerp(activeBodyY, idleBodyY, idleWeight);

    const activeHeadY = targetX * 0.45;
    const activeHeadX = -targetY * 0.3;
    const idleHeadY = 0.4;
    const idleHeadX = 0.2;
    mascotParts.head.rotation.y = lerp(activeHeadY, idleHeadY, idleWeight);
    mascotParts.head.rotation.x = lerp(activeHeadX, idleHeadX, idleWeight);
    mascotParts.head.rotation.z = lerp(0, 0.1, idleWeight);

    mascotParts.pupils.position.x = lerp(targetX * 0.08, 0.12, idleWeight);
    mascotParts.pupils.position.y = lerp(targetY * 0.08, -0.05, idleWeight);

    const activeLeftLegX = Math.sin(time * 4) * 0.08;
    const activeRightLegX = Math.cos(time * 4) * 0.08;
    const activeLeftLegY = Math.cos(time * 2) * 0.05;
    const activeRightLegY = Math.sin(time * 2) * 0.05;
    const idleLeftLegX = -Math.PI / 2.2 + Math.sin(time * 6) * 0.05;
    const idleRightLegX = -Math.PI / 2.2 + Math.cos(time * 6) * 0.05;
    mascotParts.leftLeg.rotation.x = lerp(activeLeftLegX, idleLeftLegX, idleWeight);
    mascotParts.rightLeg.rotation.x = lerp(activeRightLegX, idleRightLegX, idleWeight);
    mascotParts.leftLeg.rotation.y = lerp(activeLeftLegY, 0.1, idleWeight);
    mascotParts.rightLeg.rotation.y = lerp(activeRightLegY, -0.1, idleWeight);
    mascotParts.leftLeg.rotation.z = lerp(0, 0.2, idleWeight);
    mascotParts.rightLeg.rotation.z = lerp(0, -0.2, idleWeight);

    const activeLeftArmX = Math.sin(time * 4) * 0.15;
    const activeLeftArmZ = 0.05 + Math.cos(time * 2) * 0.05;
    const activeRightArmX = -Math.cos(time * 4) * 0.15;
    const activeRightArmZ = -0.05 - Math.sin(time * 2) * 0.05;
    const idleLeftArmX = 0.4 + Math.sin(time * 2) * 0.05;
    const idleLeftArmZ = 0.1;
    const lickSpeed = time * 8;
    const idleRightArmX = -1.8 + Math.cos(lickSpeed) * 0.3;
    const idleRightArmZ = 1 + Math.sin(lickSpeed) * 0.2;
    mascotParts.leftArm.rotation.x = lerp(activeLeftArmX, idleLeftArmX, idleWeight);
    mascotParts.leftArm.rotation.z = lerp(activeLeftArmZ, idleLeftArmZ, idleWeight);
    mascotParts.rightArm.rotation.x = lerp(
      activeRightArmX,
      idleRightArmX,
      idleWeight,
    );
    mascotParts.rightArm.rotation.z = lerp(
      activeRightArmZ,
      idleRightArmZ,
      idleWeight,
    );

    const activeTailZ = Math.sin(time * 3) * 0.15;
    const idleTailZ = Math.sin(time * 5) * 0.4;
    mascotParts.tail.rotation.z = lerp(activeTailZ, idleTailZ, idleWeight);
    mascotParts.tail.rotation.y = 0;

    const activeTailX = -Math.PI / 6 + Math.cos(time * 3) * 0.05;
    const idleTailX = Math.sin(time * 5) * 0.05;
    mascotParts.tail.rotation.x = lerp(activeTailX, idleTailX, idleWeight);

    renderer.render(scene, camera);
  };

  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          resize();
        })
      : null;

  document.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", resize);
  resizeObserver?.observe(container);
  animate();

  return () => {
    window.cancelAnimationFrame(frameId);
    document.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", resize);
    resizeObserver?.disconnect();

    scene.traverse((object) => {
      const mesh = object as {
        geometry?: { dispose?: () => void };
        material?:
          | { dispose?: () => void }
          | Array<{ dispose?: () => void }>;
      };

      mesh.geometry?.dispose?.();

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
          material.dispose?.();
        });
      } else {
        mesh.material?.dispose?.();
      }
    });

    renderer.dispose();
    renderer.forceContextLoss();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  };
}

export function AcademicCatMascot({
  className,
  variant = "default",
}: AcademicCatMascotProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposeScene: (() => void) | undefined;
    let isCancelled = false;

    void import("three").then((THREE) => {
      if (isCancelled || !rootRef.current) {
        return;
      }

      disposeScene = createAcademicCatScene(rootRef.current, THREE);
    }).catch((error: unknown) => {
      console.error("Failed to load Three.js mascot", error);
    });

    return () => {
      isCancelled = true;
      disposeScene?.();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "academic-cat-mascot",
        `academic-cat-mascot--${variant}`,
        className,
      )}
      ref={rootRef}
    >
      {variant === "reader" ? (
        <div className="academic-cat-mascot__book" aria-hidden="true">
          <div className="academic-cat-mascot__book-page academic-cat-mascot__book-page--left" />
          <div className="academic-cat-mascot__book-spine" />
          <div className="academic-cat-mascot__book-page academic-cat-mascot__book-page--right" />
        </div>
      ) : null}
    </div>
  );
}
